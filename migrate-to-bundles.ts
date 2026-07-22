import * as fs from "node:fs";
import * as path from "node:path";

const POSTS_DIR = path.resolve("blog-site/content/post");
const STATIC_DIR = path.resolve("blog-site/static");
const DRY_RUN = process.argv.includes("--dry-run");

interface MigrationResult {
  slug: string;
  copiedFiles: string[];
  rewrittenRefs: number;
  skippedRefs: string[];
}

function getStaticFilePath(staticPath: string): string | null {
  const cleaned = staticPath.startsWith("/") ? staticPath.slice(1) : staticPath;
  const fullPath = path.join(STATIC_DIR, cleaned);
  return fs.existsSync(fullPath) ? fullPath : null;
}

function rewriteMarkdownImages(content: string, staticDir: string): {
  content: string;
  refs: string[];
} {
  const refs: string[] = [];
  const pattern = /!\[([^\]]*)\]\(([^)]+)\)/g;
  const replaced = content.replace(pattern, (match, alt, src) => {
    if (src.startsWith("http://") || src.startsWith("https://")) return match;
    const staticFile = getStaticFilePath(src);
    if (staticFile) {
      refs.push(src);
      const filename = path.basename(src);
      return `![${alt}](${filename})`;
    }
    return match;
  });
  return { content: replaced, refs };
}

function rewriteFigureShortcodes(content: string): {
  content: string;
  refs: string[];
} {
  const refs: string[] = [];
  const pattern = /\{\{<\s*figure\s+([^>]*?)src="([^"]+)"([^>]*?)>\}\}/g;
  const replaced = content.replace(pattern, (match, before, src, after) => {
    if (src.startsWith("http://") || src.startsWith("https://")) return match;
    const staticFile = getStaticFilePath(src);
    if (staticFile) {
      refs.push(src);
      const filename = path.basename(src);
      return `{{< figure ${before}src="${filename}"${after} >}}`;
    }
    return match;
  });
  return { content: replaced, refs };
}

function rewriteHtmlImgTags(content: string): {
  content: string;
  refs: string[];
} {
  const refs: string[] = [];
  const pattern = /<img\s+([^>]*?)src="([^"]+)"([^>]*?)>/gi;
  const replaced = content.replace(pattern, (match, before, src, after) => {
    if (src.startsWith("http://") || src.startsWith("https://")) return match;
    const staticFile = getStaticFilePath(src);
    if (staticFile) {
      refs.push(src);
      const filename = path.basename(src);
      return `<img ${before}src="${filename}"${after}>`;
    }
    return match;
  });
  return { content: replaced, refs };
}

function rewriteHtmlLinks(content: string): {
  content: string;
  refs: string[];
} {
  const refs: string[] = [];
  const pattern = /<a\s+([^>]*?)href="([^"]+)"([^>]*?)>/gi;
  const replaced = content.replace(pattern, (match, before, href, after) => {
    if (href.startsWith("http://") || href.startsWith("https://")) return match;
    if (href.startsWith("#")) return match;
    const staticFile = getStaticFilePath(href);
    if (staticFile) {
      refs.push(href);
      const filename = path.basename(href);
      return `<a ${before}href="${filename}"${after}>`;
    }
    return match;
  });
  return { content: replaced, refs };
}

function rewriteMarkdownLinks(content: string): {
  content: string;
  refs: string[];
} {
  const refs: string[] = [];
  const pattern = /\[([^\]]*)\]\(([^)]+)\)/g;
  const replaced = content.replace(pattern, (match, text, href) => {
    if (href.startsWith("http://") || href.startsWith("https://")) return match;
    if (href.startsWith("#")) return match;
    const staticFile = getStaticFilePath(href);
    if (staticFile) {
      refs.push(href);
      const filename = path.basename(href);
      return `[${text}](${filename})`;
    }
    return match;
  });
  return { content: replaced, refs };
}

function rewriteFrontmatterImages(
  content: string,
  frontmatterEnd: number
): { content: string; refs: string[] } {
  const refs: string[] = [];
  const before = content.slice(0, frontmatterEnd);
  const after = content.slice(frontmatterEnd);

  const thumbnailPattern = /thumbnail:\s*"([^"]+)"/g;
  const replacedThumbnail = before.replace(thumbnailPattern, (match, imgPath) => {
    if (imgPath.startsWith("http://") || imgPath.startsWith("https://")) return match;
    const staticFile = getStaticFilePath(imgPath);
    if (staticFile) {
      refs.push(imgPath);
      const filename = path.basename(imgPath);
      return `thumbnail: "${filename}"`;
    }
    return match;
  });

  const imagesPattern = /images:\s*\[([^\]]*)\]/g;
  const replacedImages = replacedThumbnail.replace(imagesPattern, (match, items) => {
    const newItems = items.replace(/"([^"]+)"/g, (itemMatch: string, imgPath: string) => {
      if (imgPath.startsWith("http://") || imgPath.startsWith("https://")) return itemMatch;
      const staticFile = getStaticFilePath(imgPath);
      if (staticFile) {
        refs.push(imgPath);
        const filename = path.basename(imgPath);
        return `"${filename}"`;
      }
      return itemMatch;
    });
    return `images: [${newItems}]`;
  });

  return {
    content: replacedImages + after,
    refs,
  };
}

function findFrontmatterEnd(content: string): number {
  if (content.startsWith("---")) {
    const end = content.indexOf("\n---", 3);
    return end !== -1 ? end + 4 : -1;
  }
  if (content.startsWith("+++")) {
    const end = content.indexOf("\n+++", 3);
    return end !== -1 ? end + 4 : -1;
  }
  return -1;
}

function copyFileToBundle(
  staticPath: string,
  bundleDir: string
): string | null {
  const staticFile = getStaticFilePath(staticPath);
  if (!staticFile) return null;

  const filename = path.basename(staticPath);
  const dest = path.join(bundleDir, filename);

  if (!DRY_RUN) {
    fs.copyFileSync(staticFile, dest);
  }
  return filename;
}

function migratePost(slug: string): MigrationResult {
  const mdPath = path.join(POSTS_DIR, `${slug}.md`);
  const bundleDir = path.join(POSTS_DIR, slug);
  const result: MigrationResult = {
    slug,
    copiedFiles: [],
    rewrittenRefs: 0,
    skippedRefs: [],
  };

  let content = fs.readFileSync(mdPath, "utf-8");
  const fmEnd = findFrontmatterEnd(content);
  if (fmEnd === -1) {
    console.warn(`  ⚠ No frontmatter found in ${slug}.md`);
    return result;
  }

  // Rewrite frontmatter images
  const fmResult = rewriteFrontmatterImages(content, fmEnd);
  content = fmResult.content;
  result.rewrittenRefs += fmResult.refs.length;

  // Rewrite markdown images
  const mdImgResult = rewriteMarkdownImages(content, bundleDir);
  content = mdImgResult.content;
  result.rewrittenRefs += mdImgResult.refs.length;

  // Rewrite figure shortcodes
  const figResult = rewriteFigureShortcodes(content);
  content = figResult.content;
  result.rewrittenRefs += figResult.refs.length;

  // Rewrite HTML img tags
  const htmlImgResult = rewriteHtmlImgTags(content);
  content = htmlImgResult.content;
  result.rewrittenRefs += htmlImgResult.refs.length;

  // Rewrite HTML links
  const htmlLinkResult = rewriteHtmlLinks(content);
  content = htmlLinkResult.content;
  result.rewrittenRefs += htmlLinkResult.refs.length;

  // Rewrite markdown links
  const mdLinkResult = rewriteMarkdownLinks(content);
  content = mdLinkResult.content;
  result.rewrittenRefs += mdLinkResult.refs.length;

  // Collect all unique static file references
  const allRefs = [
    ...fmResult.refs,
    ...mdImgResult.refs,
    ...figResult.refs,
    ...htmlImgResult.refs,
    ...htmlLinkResult.refs,
    ...mdLinkResult.refs,
  ];

  // Create bundle directory
  if (!DRY_RUN && !fs.existsSync(bundleDir)) {
    fs.mkdirSync(bundleDir, { recursive: true });
  }

  // Copy static files and write index.md
  for (const ref of allRefs) {
    const copied = copyFileToBundle(ref, bundleDir);
    if (copied) {
      result.copiedFiles.push(copied);
    } else {
      result.skippedRefs.push(ref);
    }
  }

  if (!DRY_RUN) {
    fs.writeFileSync(path.join(bundleDir, "index.md"), content);
    fs.unlinkSync(mdPath);
  }

  return result;
}

function main() {
  console.log(`\nHugo Page Bundle Migration${DRY_RUN ? " (DRY RUN)" : ""}\n`);

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
  console.log(`Found ${files.length} posts to migrate.\n`);

  let totalCopied = 0;
  let totalRewritten = 0;
  const allSkipped: string[] = [];

  for (const file of files) {
    const slug = file.replace(/\.md$/, "");
    console.log(`Migrating: ${slug}`);
    const result = migratePost(slug);

    if (result.copiedFiles.length > 0) {
      console.log(`  Copied ${result.copiedFiles.length} files: ${result.copiedFiles.join(", ")}`);
    }
    if (result.rewrittenRefs > 0) {
      console.log(`  Rewrote ${result.rewrittenRefs} references`);
    }
    if (result.skippedRefs.length > 0) {
      console.log(`  Skipped ${result.skippedRefs.length} refs: ${result.skippedRefs.join(", ")}`);
      allSkipped.push(...result.skippedRefs);
    }
    if (result.copiedFiles.length === 0 && result.rewrittenRefs === 0) {
      console.log(`  No static resources to copy`);
    }

    totalCopied += result.copiedFiles.length;
    totalRewritten += result.rewrittenRefs;
  }

  console.log(`\n--- Summary ---`);
  console.log(`Posts processed: ${files.length}`);
  console.log(`Files copied: ${totalCopied}`);
  console.log(`References rewritten: ${totalRewritten}`);
  if (allSkipped.length > 0) {
    console.log(`Skipped refs (not in static/): ${[...new Set(allSkipped)].join(", ")}`);
  }
}

main();

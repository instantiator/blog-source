---
title: "Querying data files with terminal tools"
date: 2021-01-04T17:30:00Z
draft: false
tags: ["linux", "os x", "tool", "data", "json", "yaml", "csv"]
categories: ["tools"]
---

There are a many ways to peek inside a data file and reason about its contents.
This post is about a triplet of simple, easily available tools that
I've found handy for searching and querying common data file formats.
You might too...

| format | tool | notes |
|--------|------|-------|
| CSV | `q` | Query CSV files with SQL-like SELECT statements. |
| JSON | `jq` | Look inside JSON files. |
| YAML | `yq` | Look inside YAML files. |

If you're on OS X, they're each available through [homebrew](https://brew.sh/):

```bash
brew install q jq yq
```

# Querying CSV files

```bash
q "<sql-like-query>"
```

`q` is a tool that allows you to query CSV files as if they were database tables,
using a SQL-like syntax. For example:

```bash
q "SELECT COUNT(*) FROM ./my-data.csv"
q "SELECT * FROM ./my-data.csv"
q "SELECT * FROM ./my-data.csv WHERE c2 > 50"
```

`q` supports all `sqlite3` query constructs, and filenames are substituted for the tables themselves.

If the `-H` option is provided, the first row will be interpeted as a header, and column names will be derived from the header row.
Otherwise they will be named `c0`, `c1`, `c2`, etc.

Output from `q` is formatted as CSV.

Find out more from the built in help: `q --help`

# Querying JSON files

```bash
jq <filter> <files...>
```

`jq` is a JSON procesor. To use it, provide a filter and one or more filenames to operate on.

The simplest filter is `.path.to.something` - you provide the key, and `jq` will provide the value found in the JSON files.

* Wrap special characters in inverted commas.
* Indexes into arrays are a number wrapped in square brackets. They're zero-indexed. 
* If you don't want to see an error for something that's missing, suffix a `?`

For example:

```bash
jq .foo.bar ./my-file.json
jq .foo.bar.list[2] ./my-file.json
jq .foo.bar? ./my-file.json
```

There are plenty of more interesting filters you can compose to find what you need. The manual pages for `jq` are very detailed.

```bash
man jq
```

# Querying YAML files

```bash
yq eval-all "<expression>" <files...>
```

`yq` is a tool to query YAML files. You provide an expression and `yq` will evalute it for you over
all YAML documents in each YAML file listed.

For example:

```bash
yq eval-all ".path.to.something" ./my-config.yml
```

Find out more from the built in help: `yq --help`, and `yq eval --help`

# Querying lots of files

It can't have escaped your notice that these tools can operate on one or more 

`bash` (and other command shells) offer scripting features that allow you to locate and iterate over files.

For example, this script explores the path passed in the first argument.
It finds each file in the directory specified, and prints whatever is at `.entity.name` in the YAML there:

```bash
DIR=$1                                      # the first parameter is the directory to search
for FILE in "$DIR"/*.yml; do                # iterate through each file in the directory
  FILENAME=$(basename $FILE)                # uses basename to get the filename without the path
  NAME=$(yq .entity.name $FILE)             # uses yq to find the value at .entity.name in the file
  echo "$FILENAME contains entity: $NAME"   # print the file name, and entity name found in the file
done                                        # continue looping through the files
```

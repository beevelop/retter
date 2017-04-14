# retter – **RE**verse **T**empla**T**ing **E**xtracto**R**

> Allows you to extract values (to JSON) out of a file or stdin based on a mustach template definition.

## Quick start
1. Install retter: `npm i -g retter`
2. Define template ([mustache Syntax](https://mustache.github.io/))
3. Get your content (save as file or prepare to pipe into `retter`)
4. Run retter
  - Stdin: `cat content.file | retter template.mustache`
  - File: `retter template.mustache content.txt`

## Use case
`retter` is supposed to save you some headache when parsing command line output or files. Using `awk`, `sed`, `grep` and all their other friends is suitable for nerve-racking hours of trial and error – if you want to get this stuff done fast use `retter`.
Typical use case: Some awesome command line tool generates the very same (but different) output every time (like every freakin' CI automation does). Now you want to get the data / values extracted from the output for further processing / analysis / whatever.

## Further processing


## Example (parsing a Sonarlint output)
#### Template
```
-------------  SonarLint Report  -------------

          {{issues}} issues ({{files}} files analyzed)

          {{blocker}} blocker
          {{critical}} critical
          {{major}} major
          {{minor}} minor
          {{info}} info

-------------------------------------------
```

#### Content
```
-------------  SonarLint Report  -------------

          11280 issues (3577 files analyzed)

          131 blocker
          1170 critical
          5984 major
          3951 minor
          44 info

-------------------------------------------
```

#### Command
```sh
$ retter examples/template examples/content
{ issues: '11280',
  files: '3577',
  blocker: '131',
  critical: '1170',
  major: '5984',
  minor: '3951',
  info: '44' }
```


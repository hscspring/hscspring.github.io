import re

def add_superscript_references(markdown_text):
    # 匹配 Markdown 格式的链接：[标题](链接)
    pattern = re.compile(r'\[([^\]]+)\]\((https?://[^\)]+)\)')
    
    references = []
    seen = {}
    counter = 1

    def replacer(match):
        nonlocal counter
        title, url = match.groups()
        key = (title, url)
        if key not in seen:
            seen[key] = counter
            references.append((counter, title, url))
            counter += 1
        index = seen[key]
        return f'[{title}]({url})<sup>[{index}]</sup>'

    # 替换正文中的链接，加上上标
    modified_text = pattern.sub(replacer, markdown_text)

    # 生成 Reference 部分
    ref_lines = ['\n\n## References\n']
    for idx, title, url in references:
        ref_lines.append(f'`[{idx}]` {title}: *{url}*  ')
    
    modified_text += '\n'.join(ref_lines)
    return modified_text



if __name__ == "__main__":
    import sys
    fin = sys.argv[1]
    fout = fin
    with open(fin, "r") as f:
        txt = f.read()
    new = add_superscript_references(txt)
    with open(fout, "w") as f:
        f.write(new)
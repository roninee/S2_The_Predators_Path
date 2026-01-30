#!/bin/zsh

echo "开始验证并清理当前目录下的原始图片文件（JPG/JPEG/PNG，大小写不敏感）..."
echo "规则：每个原始文件必须有同名的 .webp 文件（大小 > 0），否则跳过。"

# 统计变量
deleted_count=0
skipped_count=0
total_count=0

# 用 find 查找所有 jpeg、jpg 和 png 文件（当前目录，大小写不敏感）
find . -maxdepth 1 -type f \( -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" \) | while read -r img_file; do
    # 移除 ./ 前缀，获取纯文件名
    img_file=${img_file#./}
    
    total_count=$((total_count + 1))
    
    # 构建对应 WebP 文件名（假设 WebP 是小写 .webp）
    base_name="${img_file%.*}"
    base_name_lower="${base_name:l}"  # 转小写 basename（以防 WebP 是小写）
    webp_file="${base_name_lower}.webp"
    
    echo "检查: $img_file"
    echo "  对应 WebP: $webp_file"
    
    # 检查 WebP 是否存在且大小 > 0（-s 是标准检查非空文件）
    if [[ -s "$webp_file" ]]; then
        echo "  ✓ WebP 有效 (大小 > 0)"
        echo "  删除原始: $img_file"
        rm "$img_file"
        if [[ $? -eq 0 ]]; then
            echo "    → 删除成功！"
            deleted_count=$((deleted_count + 1))
        else
            echo "    → 删除失败！（检查权限: ls -l $img_file）"
            skipped_count=$((skipped_count + 1))
        fi
    else
        echo "  ✗ WebP 无效或缺失 (ls -l $webp_file 检查)"
        skipped_count=$((skipped_count + 1))
    fi
    echo "---"
done

# 如果 find 没找到文件
if [[ $total_count -eq 0 ]]; then
    echo "当前目录无 JPG/JPEG/PNG 文件（大小写不敏感）。用 'find . -maxdepth 1 -type f -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg"' 手动检查。"
fi

# 最终报告
echo "清理完成！"
echo "总原始文件: $total_count"
echo "删除: $deleted_count"
echo "跳过: $skipped_count"
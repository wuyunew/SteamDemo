
<style lang="less" scoped>
.wishList {
    background-color: #1B2838;
    padding-left: 20%;
    min-height: 690px;

    .userInformation {
        width: 100%;
        display: flex;
        padding-top: 40px;

        .header {
            width: 75px;
            height: 75px;
            border-radius: 10px;

            img {
                width: 100%;
                height: 100%;
                border-radius: 10px;
            }
        }

        .title {
            margin-left: 30px;
            font-size: 30px;
            line-height: 60px;
            color: white;
        }
    }

    .search {
        display: flex;
        align-items: center;
        gap: 10px; // 添加按钮和输入框之间的间距

        input[type="search-input"] {
            width: 70%; // 设置输入框宽度
            padding: 8px 12px; // 内边距
            border: none; // 移除默认边框
            background-color: #2C3E50; // 背景颜色
            color: white; // 文字颜色
            border-radius: 4px; // 圆角
            font-size: 14px; // 字体大小

            &::placeholder {
                color: rgba(255, 255, 255, 0.6); // 占位符颜色
            }
        }

        button {
            background-color: #2C3E50; // 按钮背景颜色
            color: white; // 按钮文字颜色
            border: none; // 移除默认边框
            padding: 8px 12px; // 内边距
            border-radius: 4px; // 圆角
            cursor: pointer; // 鼠标悬停时显示指针

            &:hover {
                background-color: #34495e; // 鼠标悬停时的背景颜色
            }
        }
    }

    .gameslist {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: 20px;
        padding-top: 20px;

        .gameItem {
            width: 100%;
            background-color: #2C3E50;
            border-radius: 10px;
            overflow: hidden;
            padding: 20px;

            .left {
                margin-right: 20px;

                .index {
                    font-size: 14px;
                    color: white;
                }
            }

            .right {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                height: 100%;

                .gameImg {
                    .mainImg {
                        width: 100%; /* 让图片宽度占满容器 */
                        height: auto; /* 自动调整高度保持比例 */
                        border-radius: 10px;
                        object-fit: cover; /* 确保图片覆盖整个区域 */
                    }
                }

                .intorduce {
                    h3 {
                        color: white;
                        margin-bottom: 10px;
                    }

                    p {
                        color: gray;
                        margin-bottom: 10px;
                    }

                    .buy {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;

                        button {
                            background-color: green;
                            color: white;
                            border: none;
                            padding: 5px 10px;
                            border-radius: 5px;
                        }
                    }
                }
            }
        }
    }
}
</style>

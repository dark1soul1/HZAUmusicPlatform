<template>
    <div class="footer">
        <div class="inner">
            <div class="footer_info">
                <div class="footer_link">
                    <h3 class="footer_tit">合作链接</h3>
                    <ul class="footer_link_list">
                        <li class="footer_link_list_item">
                            <a href="https://portal-paas.hzau.edu.cn/main.html" target="_blank">信息门户</a>
                        </li>
                        <li class="footer_link_list_item">
                            <a href="https://webmail.hzau.edu.cn/" target="_blank">学生电子邮件系统</a>
                        </li>
                        <li class="footer_link_list_item">
                            <a href="https://mail.hzau.edu.cn/" target="_blank">教师电子邮件系统</a>
                        </li>
                        <li class="footer_link_list_item">
                            <a href="https://bwg.hzau.edu.cn/" target="_blank">博物馆</a>
                        </li>
                        <li class="footer_link_list_item">
                            <a href="https://lib.hzau.edu.cn/" target="_blank">图书馆</a>
                        </li>
                        <li class="footer_link_list_item">
                            <a href="http://gis.hzau.edu.cn/index.shtml" target="_blank">校园地图</a>
                        </li>
                        <li class="footer_link_list_item">
                            <a href="https://news.hzau.edu.cn/" target="_blank">南湖新闻网</a>
                        </li>
                    </ul>
                </div>
                <div class="footer_copyright">
                    <p>
                        <a href="https://www.hzau.edu.cn/" target="_blank">关于华农</a> |
                        <a href="https://en.hzau.edu.cn/" target="_blank">About HZAU</a>
                    </p>
                    <p>Copyright © 2024 - 2024 HZAU. 
                        <a href="">All Rights Reserved.</a>
                    </p>
                    <p> 
                        <a href="">版权暂无</a> |
                        <a href="">非法营业</a> |网络文化经营许可证：
                        <a href="">网文不知道多少号</a>｜联系电话：
                        <a href="tel:13597666065">135976666065</a>｜联系邮箱：
                        <a href="mailto:627602537@qq.com">627602537@qq.com</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
.footer{
    position:relative;
}
.footer,.footer a {
    color: #999;
}
.footer a:hover {
    color: #31c27c;
}
.footer {
    background-color: #333;
    clear: both;
}
.footer_info {
    border-bottom: 1px solid #353535;
    overflow: hidden;
    padding-bottom: 45px;
    height: 300px;
}
.footer_tit {
    font-size: 15px;
    font-weight: 400;
    padding: 80px 0 30px;
}
.footer_link {
    float: left;
    width: 330px;
    padding-bottom: 57px;
}
.footer_link_list_item {
    float: left;
    min-width: 110px;
    margin-bottom: 12px;
}
.footer_copyright {
    position: absolute;
    left: 25%;
    bottom: 0;
    padding: 24px 0; 
    text-align: center;
    line-height: 28px; 
    font-size: 12px;
}
</style>
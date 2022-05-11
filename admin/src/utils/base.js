const base = {
    get() {
        return {
            url : "http://localhost:8080/springboot2739u/",
            name: "springboot2739u",
            // 退出到首页链接
            indexUrl: 'http://localhost:8080/springboot2739u/front/h5/index.html'
        };
    },
    getProjectName(){
        return {
            projectName: "苏科大劳动积分系统"
        } 
    }
}
export default base

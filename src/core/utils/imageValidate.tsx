export const imgValidate = (imgUrl : string) => {

    if(imgUrl === null || imgUrl == undefined){
        return "/mato.jpg"
    }
    if(imgUrl.startsWith("https")){
        return imgUrl
    }
  
    return "/mato.jpg"
}
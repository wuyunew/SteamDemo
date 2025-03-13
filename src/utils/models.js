import { ref } from "vue";

class Game {
    constructor(data) {
        this.name = data.name;
        this.releaseDate = data.releaseDate;
        this.labels = data.labels;
        this.videosUrl = data.videosUrl;
        this.imgsUrl = data.imgsUrl;
        this.price = data.price;
        this.introduce = data.introduce;
        this.about = data.about;
        this.evaluate = data.evaluate;
        this.supports = data.supports;
    }
}
class Game_type1 extends Game{
    constructor(data){
        super(data);
    }
    getSpecialFeatures(){
        console.log("比200r贵")
    }
}
class Game_type2 extends Game{
    constructor(data){
        super(data);
    }
    getSpecialFeatures(){
        console.log("比200r便宜")
    }
}
//轮播器控制
class CarouselControl{
    constructor(num) {
        this.num = num;
        this.curGame = ref(0);
        this.timer = null;
    }
    getCurGame() {
        return this.curGame.value;
    }
    nextGame() {
        this.curGame.value = (this.curGame.value + 1) % this.num;
    }
    prevGame() {
        this.curGame.value = (this.curGame.value - 1 + this.num) % this.num;
    }
    select(index) {
        this.curGame.value = index;
    }
    pause() {
        clearInterval(this.timer);
    }
    start() {
        this.timer = setInterval(() => {
            this.nextGame()
        }, 5000);
    }
}
export{
    Game,
    Game_type1,
    Game_type2,
    CarouselControl,
}
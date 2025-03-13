
class CarouselControlClass extends CarouselControl {
    constructor(num) {
        super(num);
        // 视频控制
        this.isPlaying = ref(false);
        // 滑动条
        this.isDragging = ref(false);
        this.startX = ref(0);
        this.startScrollLeft = ref(0);
        this.speed = 1;
        this.scrollViewWidth = ref(0); // 新增：保存滑动区域宽度
        this.sliderThumbPosition = ref(0); // 新增：保存滑块位置
    }

    // 计算滑块位置的方法
    calculateSliderThumbPosition() {
        const totalItems = items.value.length;
        const currentIndex = carouselControls.getCurGame();
        this.sliderThumbPosition.value = (currentIndex / totalItems) * 100;
    }

    startDrag(event) {
        this.isDragging.value = true;
        this.startX.value = event.pageX - this.scrollView.value.offsetLeft;
        this.startScrollLeft.value = this.scrollView.value.scrollLeft;
    }

    onDrag(event) {
        if (!this.isDragging.value) return;
        event.preventDefault();
        const x = event.pageX - this.scrollView.value.offsetLeft;
        const walk = (x - this.startX.value) * this.speed;
        const newScrollLeft = this.startScrollLeft.value - walk;

        // 更新滑块位置
        this.sliderThumbPosition.value = (newScrollLeft / this.scrollViewWidth.value) * 100;

        this.scrollView.value.scrollLeft = newScrollLeft;
    }

    endDrag(event) {
        this.isDragging.value = false;
    }
}

const carouselControls = new CarouselControlClass(items.value.length);

// 初始化滑动条宽度和滑块位置
carouselControls.scrollViewWidth.value = document.querySelector('.thumbnails').scrollWidth;
carouselControls.calculateSliderThumbPosition();

// 当前展示的图片或视频
const currentItem = computed(() => items.value[carouselControls.getCurGame()]);

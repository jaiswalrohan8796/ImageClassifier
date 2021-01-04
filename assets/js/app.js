(async () => {
    const video = document.getElementById("video");
    const wait = document.getElementById("wait");
    const isee = document.getElementById("i-see");
    var mediaDevices = document.getElementById("mediaDevices");
    var cam = document.getElementById("cam");
    var camId = [];
    const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: "enviroment",
    });
    video.srcObject = stream;

    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    const status = document.getElementById("status");

    const model = await mobilenet.load();

    predict();

    async function predict() {
        wait.innerHTML = "";
        isee.style.display = "block";

        context.drawImage(video, 0, 0, 500, 500);

        const predictions = await model.classify(canvas);
        console.log(predictions);

        status.innerHTML = `${
            predictions[0].className
        } / ${predictions[0].probability.toFixed(2)}`;

        setTimeout(predict, 1000);
    }
})();

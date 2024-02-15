export default class MediaHandlder {
    getPermission() {
        return new Promise((resolve, reject) => {
            navigator.mediaDevices
                .getUserMedia({
                    video: true,
                    audio: true,
                })
                .then((stream) => {
                    resolve(stream);
                })
                .catch((err) => {
                    throw new Error(`Unable to fetch stream: ${err}`);
                });
        });
    }
}

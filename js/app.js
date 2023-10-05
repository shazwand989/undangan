// OK
const audio = (() => {
    let instance = null;

    let createOrGet = () => {
        if (!(instance instanceof HTMLAudioElement)) {
            instance = new Audio();
            instance.autoplay = true;
            instance.src = document.getElementById('play-music').getAttribute('data-url');
            instance.load();
            instance.currentTime = 0;
            instance.volume = 1;
            instance.muted = false;
            instance.loop = true;
        }

        return instance;
    }

    return {
        play: () => createOrGet().play(),
        pause: () => createOrGet().pause(),
    };
})();

// OK
const progressBar = (() => {
    let bar = document.getElementById('bar');
    let second = 0;
    let counter = 0;
    let stop = false;

    const sleep = (until) => new Promise((p) => {
        setTimeout(p, until);
    });

    const setNum = (num) => {
        bar.style.width = num + "%";
        bar.innerText = num + "%";

        return num == 100 || stop;
    };

    (async () => {
        while (true) {
            if (stop || setNum(counter)) {
                return;
            }

            await sleep(Math.exp(second));
            second += 0.1;
            counter += 1;
        }
    })();

    return {
        stop: () => {
            stop = true;
            setNum(100.0);
        }
    };
})();



// OK
const escapeHtml = (unsafe) => {
    return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
};

// OK
const salin = (btn, msg = null, timeout = 1500) => {
    navigator.clipboard.writeText(btn.getAttribute('data-nomer'));

    let tmp = btn.innerHTML;
    btn.innerHTML = msg ?? 'Tersalin';
    btn.disabled = true;
    let id = null;

    id = setTimeout(() => {
        btn.innerHTML = tmp;
        btn.disabled = false;
        btn.focus();

        clearTimeout(id);
        id = null;
        return;
    }, timeout);
};

// OK
const timer = () => {
    let countDownDate = (new Date(document.getElementById('time-view').getAttribute('data-time').replace(' ', 'T'))).getTime();
    let time = null;

    time = setInterval(() => {
        let distance = countDownDate - (new Date()).getTime();

        if (distance < 0) {
            clearInterval(time);
            time = null;
            return;
        }

        document.getElementById('day').innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
        document.getElementById('hour').innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        document.getElementById('minute').innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        document.getElementById('second').innerText = Math.floor((distance % (1000 * 60)) / 1000);
    }, 1000);
};

// OK
const animation = () => {
    const duration = 10 * 1000;
    const animationEnd = Date.now() + duration;
    let skew = 1;

    let randomInRange = (min, max) => {
        return Math.random() * (max - min) + min;
    }

    (function frame() {
        const timeLeft = animationEnd - Date.now();
        const ticks = Math.max(200, 500 * (timeLeft / duration));

        skew = Math.max(0.8, skew - 0.001);

        confetti({
            particleCount: 1,
            startVelocity: 0,
            ticks: ticks,
            origin: {
                x: Math.random(),
                y: Math.random() * skew - 0.2,
            },
            colors: ["FFC0CB", "FF69B4", "FF1493", "C71585"],
            shapes: ["heart"],
            gravity: randomInRange(0.5, 1),
            scalar: randomInRange(1, 2),
            drift: randomInRange(-0.5, 0.5),
        });

        if (timeLeft > 0) {
            requestAnimationFrame(frame);
        }
    })();
};

// OK
const buka = async () => {

    document.querySelector('body').style.overflowY = 'scroll';

    opacity('welcome');
    document.getElementById('play-music').style.display = 'block';
    audio.play();
    AOS.init();

    await confetti({
        origin: { y: 0.8 },
        zIndex: 1057
    });

    timer();
    animation();
    goHome();

};

const goHome = () => {
    // go to id
    document.getElementById('home').scrollIntoView({
        behavior: 'smooth'
    });
};

// OK
const play = (btn) => {
    if (btn.getAttribute('data-status') !== 'true') {
        btn.setAttribute('data-status', 'true');
        audio.play();
        btn.innerHTML = '<i class="fa-solid fa-circle-pause"></i>';
    } else {
        btn.setAttribute('data-status', 'false');
        audio.pause();
        btn.innerHTML = '<i class="fa-solid fa-circle-play"></i>';
    }
};

// OK
const modalFoto = (img) => {
    document.getElementById('showModalFoto').src = img.src;
    (new bootstrap.Modal('#modalFoto')).show();
};


// OK
const opacity = (nama) => {
    let op = parseInt(document.getElementById(nama).style.opacity);
    let clear = null;

    clear = setInterval(() => {
        if (op >= 0) {
            op -= 0.025;
            document.getElementById(nama).style.opacity = op;
        } else {
            clearInterval(clear);
            clear = null;
            document.getElementById(nama).remove();
            return;
        }
    }, 10);
};

// OK
window.addEventListener('load', () => {
    progressBar.stop();
    opacity('loading');
});

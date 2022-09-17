const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const playlist = $(".playlist");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const cd = $(".cd");
const playBtn = $(".btn-toggle-play");
const player = $(".player");
const progress = $("#progress");
const nextBtn = $(".btn-next");
const prevBtn = $(".btn-prev");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");

const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  settings: {},
  songs: [
    {
      name: "Chạy Về Khóc Với Anh",
      singer: "ERIK, Nguyễn Phúc Thiện",
      path: "https://mp3-320s1-m-zmp3.zmdcdn.me/accc77b035f1dcaf85e0/5808013481527156466?authen=exp=1663590617~acl=/accc77b035f1dcaf85e0/*~hmac=15c5d12ab170d08d5c269ab7749a2fc2",
      image:
        "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/9/f/f/a/9ffafb980fc0ec3ce6846034aa77834e.jpg",
    },
    {
      name: "Người Ta Đâu Thương Em",
      singer: "LyLy",
      path: "https://mp3-320s1-m-zmp3.zmdcdn.me/153db3c5e2840bda5295/8397205769418979340?authen=exp=1663591029~acl=/153db3c5e2840bda5295/*~hmac=fdf7c22c4f9c08a38359d05672bb544c",
      image:
        "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/f/1/4/8/f14858a6d4d9aecf59026271f296e784.jpg",
    },
    {
      name: "Sài Gòn Chiều Nay Có Mưa Bay",
      singer: "Hakoota Dũng Hà",
      path: "https://mp3-320s1-m-zmp3.zmdcdn.me/6b286cd70a96e3c8ba87/8855599642048687919?authen=exp=1663590635~acl=/6b286cd70a96e3c8ba87/*~hmac=125e74c398daa0e70b432381f487dde3",
      image:
        "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/4/9/b/5/49b59f1e46c69a164a9a975531c24bb1.jpg",
    },
    {
      name: "Mây Hạ",
      singer: "Starry Night",
      path: "https://mp3-320s1-m-zmp3.zmdcdn.me/15cfbbb59af473aa2ae5/3973739940008074683?authen=exp=1663590704~acl=/15cfbbb59af473aa2ae5/*~hmac=0e882430a40a072fbdaf1898ace59306",
      image:
        "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/5/b/a/d/5badd6b2309faa77c8f5f2d1c5017917.jpg",
    },
    {
      name: "Và Ngày Nào Đó",
      singer: "Quang Trung, Vũ Thảo My",
      path: "https://mp3-320s1-m-zmp3.zmdcdn.me/67f00f3a5d7bb425ed6a/585314730896439902?authen=exp=1663590835~acl=/67f00f3a5d7bb425ed6a/*~hmac=c33e2d5eae4d23a55f429902b6879abd",
      image:
        "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/5/4/1/f/541fd601407b338092e7df084c1c46a9.jpg",
    },
    {
      name: "Gió Vẫn Hát",
      singer: "Long Pham",
      path: "https://mp3-320s1-m-zmp3.zmdcdn.me/e715a5498a0e63503a1f/22923955729207767?authen=exp=1663591350~acl=/e715a5498a0e63503a1f/*~hmac=150e0fa712f9c780e4cfcd23ea1e82b7",
      image:
        "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/2/3/5/9/23595cbd08f3e37f9e42fc163f6d08aa.jpg",
    },
    {
      name: "Khi Người Lớn Cô Đơn",
      singer: "Quang Vinh, Ali Hoàng Dương",
      path: "https://mp3-320s1-m-zmp3.zmdcdn.me/e715a5498a0e63503a1f/22923955729207767?authen=exp=1663591350~acl=/e715a5498a0e63503a1f/*~hmac=150e0fa712f9c780e4cfcd23ea1e82b7",
      image:
        "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/e/8/6/e/e86e935b3c2cf63cffcee9c77e62e756.jpg",
    },
  ],
  render: function () {
    var htmls = this.songs.map(function (song, index) {
      return `
                <div class="song ${
                  index === app.currentIndex ? "active" : ""
                }" data-index="${index}">
                    <div class="thumb" style="background-image: url('${
                      song.image
                    }')">
                    </div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
                `;
    });
    playlist.innerHTML = htmls.join("");
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  handleEvents: function () {
    const cdWidth = cd.offsetWidth;
    const _this = this;

    // Xu ly cd spin
    const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000,
      interations: Infinity,
    });
    cdThumbAnimate.pause();

    // Xu ly phong to/ thu nho CD
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;

      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };

    // Xu ly khi click play
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };

    // Khi song duoc play
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
      cdThumbAnimate.play();
    };

    // Khi song bi pause
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
      cdThumbAnimate.pause();
    };

    // Tien do bai hat thay doi
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      }
    };

    // Xu ly khi tua song
    progress.onchange = function (e) {
      const seekTime = (audio.duration * e.target.value) / 100;
      audio.currentTime = seekTime;
    };

    // Khi next bai hat
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.nextSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    // Khi prev bai hat
    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.prevSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    // random bai hat
    randomBtn.onclick = function (e) {
      _this.isRandom = !_this.isRandom;
      randomBtn.classList.toggle("active", _this.isRandom);
    };

    // xy ly lap lai mot bai hat
    repeatBtn.onclick = function () {
      _this.isRepeat = !_this.isRepeat;
      repeatBtn.classList.toggle("active", _this.isRepeat);
    };

    // xu ly next song khi audio ended
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };

    // Lang nghe hanh vi click vao playlist
    playlist.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active");
      if (
        e.target.closest(".song:not(.active)") ||
        e.target.closest(".option")
      ) {
        // xu ly khi click vao song
        if (e.target.closest(".song:not(.active)")) {
          _this.currentIndex = Number(songNode.dataset.index);
          _this.loadCurrentSong();
          audio.play();
          _this.render();
        }

        // Xu ly khi click vao option bai hat
        if (e.target.closest(".option")) {
        }
      }
    };
  },
  scrollToActiveSong() {
    setTimeout(() => {
      $(".song.active").scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 500);
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  playRandomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex == this.currentIndex);

    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },

  start: function () {
    // dinh nghia cac thuoc tinh cho object
    this.defineProperties();

    // lang nghe, xu ly su kien
    this.handleEvents();

    // tai thong tin bai hai dau tien vao UI khi chay ung dung
    this.loadCurrentSong();

    // render playlist
    this.render();
  },
};

app.start();

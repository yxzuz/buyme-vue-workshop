<template>
  <div>
    <v-container
      fluid
      fill-height
      class="me-hero2 d-flex flex-column align-center"
    >
      <v-card
        class="mx-auto d-flex align-center justify-center pa-4"
        color="rgba(0, 0, 0, 0.5)"
        width="800px"
        elevation="9"
        outlined
      >
        <v-avatar class="mr-4" size="140">
          <img :src="profileImg" alt="Profile" />
        </v-avatar>
        <div>
          <v-card-title class="text-h6 text-center font-weight-bold white--text"
            >Profile</v-card-title
          >
          <v-card-text class="white--text text-display-large">
            <p>Name: {{ name }}</p>
            <p>Nickname: {{ nickname }}</p>
            <p>Occupation: {{ uni }}</p>
          </v-card-text>
        </div>
      </v-card>
      <section class="interests-section" aria-labelledby="interests-title">
        <h2 id="interests-title" class="interests-title">Interests</h2>
        <div class="marquee-frame">
          <div class="marquee-track">
            <img
              v-for="(item, index) in items"
              :key="'a-' + index"
              :src="item.img"
              class="marquee-img"
              alt="Interest"
            />
            <img
              v-for="(item, index) in items"
              :key="'b-' + index"
              :src="item.img"
              class="marquee-img"
              alt="Interest"
            />
          </div>
        </div>
      </section>
      <h2 class="interests-title mt-8">Dislikes</h2>
      <div
        class="dislikes-row d-flex flex-row align-center justify-center mt-4"
      >
        <v-card class="dislike" v-for="(item, index) in dislikes" :key="index">
          <v-img :src="item.img" />
          <v-card-text class="white--text text-display-large">
            {{ item.text }}
          </v-card-text>
        </v-card>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'ProfileCard',
  data() {
    return {
      name: 'Natcha Ranchan',
      nickname: 'Mink',
      uni: '4th Year Software Engineering @Kasetsart University',
      items: [
        { img: require('@/assets/twd.png') },
        { img: require('@/assets/bb.png') },
        { img: require('@/assets/frank.png') },
        { img: require('@/assets/hxh.png') },
      ],
      spotify: require('@/assets/spotify.png'),
      profileImg: require('@/assets/IMG_7455.jpg'),
      dislikes: [
        { img: require('@/assets/bell.png'), text: 'Bell pepper' },
        {
          img: require('@/assets/sweet.png'),
          text: 'Stir-fried Sweet and Sour',
        },
      ],
    };
  },
};
</script>

<style scoped>
h2 {
  font-family: 'DM Sans', sans-serif;
  font-weight: 700;
  letter-spacing: 0.03em;
}
.me-hero2 {
  position: relative;
  z-index: 0;
  width: 100%;
  min-height: 40%;
}

.dislikes-row {
  gap: 16px;
  flex-wrap: wrap;
}

.dislike {
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  max-width: 600px;
}

.me-hero2::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background-image: linear-gradient(
      to bottom,
      #000000 0%,
      rgba(0, 0, 0, 0.55) 15%,
      rgba(0, 0, 0, 0.55) 85%,
      #000000 100%
    ),
    url('@/assets/bg3.jpg');
  background-size: cover, cover;
  background-position: center, center;
  background-blend-mode: multiply, normal;
}

.v-card {
  background: rgba(0, 0, 0, 0.5) !important;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}

.v-avatar {
  border: 2px solid rgba(219, 227, 222, 0.6);
  box-shadow: 0 0 12px rgba(239, 236, 230, 0.25);
  border: 2px solid rgba(255, 255, 255, 0.15);
}

.interests-section {
  font-family: 'DM Sans', sans-serif;
  width: 100%;
  max-width: 760px;
  margin: 28px auto 0;
}

.interests-title {
  margin: 0 0 14px;
  color: white;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-align: center;
}
.marquee-frame {
  height: 260px;
  overflow: hidden;
  border: 1px solid rgba(29, 20, 20, 0.2);
  border-radius: 16px;
  background: rgba(0, 0, 0, 0.28);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.2);
}

.marquee-track {
  display: flex;
  width: max-content;
  height: 100%;
  align-items: center;
  animation: scroll-marquee 20s linear infinite;
}

.marquee-track:hover {
  animation-play-state: paused;
}

.marquee-img {
  display: block;
  width: 180px;
  height: 250px;
  object-fit: cover;
  margin: 5px 10px;
  border-radius: 12px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.35);
  flex-shrink: 0;
}

@keyframes scroll-marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@media (max-width: 600px) {
  .marquee-frame {
    height: 220px;
    border-radius: 12px;
  }
  .marquee-img {
    width: 150px;
    height: 210px;
  }
}
</style>

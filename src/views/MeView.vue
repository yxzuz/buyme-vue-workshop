<template>
  <div>
    <MeHero />
    <ProfileCard
      :name="name"
      :nickname="nickname"
      :uni="uni"
      :profileImg="profileImg"
    />
  </div>
</template>

<script>
import MeHero from '@/components/MeHero.vue';
import ProfileCard from '@/components/ProfileCard.vue';
export default {
  components: {
    MeHero,
    ProfileCard,
  },
  data() {
    return {
      name: 'Natcha Ranchan',
      nickname: 'Mink',
      uni: '4th Year Software Engineering @Kasetsart University',
      profileImg: require('@/assets/IMG_7455.jpg'),
    };
  },
};
</script>

<style></style>

<template>
  <div class="photo__item">
    <button @click="() => addFavorit(photo)" class="photo__favorites">
      <img
        v-if="checkedFavorits(photo)"
        src="@/assets/images/star_active.png"
        alt="Избранное"
      />
      <img v-else src="@/assets/images/star_empty.png" alt="Избранное" />
    </button>
    <img
      v-if="favoriteItem"
      loading="lazy"
      :src="photo.url"
      :alt="photo.title"
      v-popup="{ imgSrc: photo.url, imgTitle: photo.title }"
    />
    <img
      v-else
      loading="lazy"
      v-tooltip="photo.title"
      v-popup="{ imgSrc: photo.url, imgTitle: photo.title }"
      :src="photo.url"
      :alt="photo.title"
    />

    <div class="photo__title" v-if="favoriteItem">{{ photo.title }}</div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  props: {
    photo: {
      type: Object,
    },
    favoriteItem: {
      type: Boolean,
    },
  },
  data() {
    return {
      isFavorite: false,
      isOpen: false,
      popupHtml: "",
    };
  },
  computed: {
    ...mapState("favorites", {
      favorites: "favorites",
      isLoading: "isLoading",
    }),
  },
  methods: {
    ...mapActions("favorites", ["saveFavorite", "saveFavorites"]),
    checkedFavorits(photo) {
      this.isFavorite = this.favorites.find((item) => item.id === photo.id);
      return this.isFavorite;
    },
    addFavorit(photo) {
      const exists = this.checkedFavorits(photo);
      if (exists) {
        this.saveFavorites(
          this.favorites.filter((item) => item.id !== photo.id)
        );
        this.isFavorite = true;
      } else {
        this.saveFavorite(photo);
        this.isFavorite = false;
      }

      localStorage.setItem("favorites", JSON.stringify(this.favorites));
    },
  },
  mounted() {
    this.saveFavorites(JSON.parse(localStorage.getItem("favorites")) || []);
  },
};
</script>

<style scoped lang="scss"></style>

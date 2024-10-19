<template>
  <AccordionItem>
    <template v-slot:header>
      <label class="accordion__title" ref="accordionTwo">
        <input
          @click="
            () => {
              onOpenPhotos(album.id);
            }
          "
          type="checkbox"
          class="accordion__checkbox"
        />
        <span>
          <div class="accordion__icon"></div>
          <div class="h2">{{ album.title }}</div>
        </span>
      </label>
    </template>
    <template v-slot:content>
      <template v-if="!isLoading">
        <div v-if="!isError" class="photo__list">
          <PhotoItem v-for="photo in photos" :key="photo.id" :photo="photo" />
        </div>
        <ErrorItem v-else :rightText="true" />
      </template>
      <LoaderItem v-else />
    </template>
  </AccordionItem>
</template>
<script>
import { mapActions } from "vuex";
import AccordionItem from "./AccordionItem.vue";
import PhotoItem from "./PhotoItem.vue";
import ErrorItem from "./ErrorItem.vue";

export default {
  name: "AlbomItem",
  components: {
    AccordionItem,
    PhotoItem,
    ErrorItem,
  },
  data() {
    return {
      photos: [],
      isLoading: false,
      isError: false,
    };
  },

  props: {
    album: {
      type: Object,
    },
  },
  methods: {
    ...mapActions("users", ["getAlbum"]),
    onOpenPhotos(albumId) {
      this.getAlbum(albumId)
        .then((data) => {
          this.photos = data;
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
          this.isError = true;
        });
    },
  },
};
</script>
<style scoped lang="scss"></style>

<template>
  <AccordionItem>
    <template v-slot:header>
      <label class="accordion__title">
        <input
          @click="() => onOpenAlbums(user.id)"
          type="checkbox"
          class="accordion__checkbox"
        />
        <span>
          <div class="accordion__icon"></div>
          <div class="h2">{{ user.name }}</div>
        </span>
      </label>
    </template>
    <template v-slot:content>
      <template v-if="!isLoading">
        <template v-if="!isError">
          <AlbomItem v-for="album in albums" :key="album.id" :album="album" />
        </template>
        <ErrorItem v-else :rightText="true" />
      </template>
      <LoaderItem v-else />
    </template>
  </AccordionItem>
</template>
<script>
import { mapActions } from "vuex";
import AccordionItem from "./AccordionItem.vue";
import AlbomItem from "./AlbomItem.vue";
import LoaderItem from "./LoaderItem.vue";
import ErrorItem from "./ErrorItem.vue";

export default {
  name: "UserItem",
  components: {
    AccordionItem,
    AlbomItem,
    LoaderItem,
    ErrorItem,
  },
  data() {
    return {
      albums: [],
      isOpen: false,
      isLoading: false,
      isError: false,
    };
  },
  props: {
    user: {
      type: Object,
    },
  },
  methods: {
    ...mapActions("users", ["getUser"]),
    onOpenAlbums(id) {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.isLoading = true;
        this.getUser(id)
          .then((data) => {
            this.albums = data;
            this.isLoading = false;
          })
          .catch(() => {
            this.isLoading = false;
            this.isError = true;
          });
      }
    },
  },
};
</script>
<style lang=""></style>

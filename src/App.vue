<template>
  <div class="main">
    <div class="container">
      <div class="main__case">
        <SwitchControll :source="switchName" @changeSwitch="changeSwitch" />
        <div v-show="activeSwitch.value == 0" class="main__container">
          <div class="main__list" v-if="!isError">
            <UserItem v-for="user in users" :key="user.id" :user="user" />
          </div>
          <ErrorItem v-else />
        </div>
        <div v-show="activeSwitch.value != 0" class="main__container">
          <div class="main__favorites" v-if="favorites.length > 0">
            <PhotoItem
              v-for="photo in favorites"
              :key="photo.id"
              :photo="photo"
              :favoriteItem="true"
            />
          </div>
          <div v-else class="main__favorites-empty">
            <img src="@/assets/images/empty.png" alt="Список пуст" />
            <h2 class="main__favorites-title">Список избранного пуст</h2>
            <p class="main__favorites-text">
              Добавляйте изображения, нажимая на звездочки
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import SwitchControll from "./components/SwitchControll.vue";
import UserItem from "./components/UserItem.vue";
import PhotoItem from "./components/PhotoItem.vue";
import ErrorItem from "./components/ErrorItem.vue";

export default {
  components: {
    SwitchControll,
    UserItem,
    PhotoItem,
    ErrorItem,
  },
  data() {
    return {
      switchName: [
        {
          id: 1,
          name: "Каталог",
          value: 0,
          checked: true,
        },
        {
          id: 2,
          name: "Избранное",
          value: 1,
          checked: false,
        },
      ],
      activeSwitch: {
        id: 1,
        name: "Каталог",
        value: 0,
        checked: true,
      },
      albums: [],
      isOpen: false,
    };
  },
  computed: {
    ...mapState("users", {
      users: "users",
      isLoading: "isLoading",
      isError: "isError",
    }),
    ...mapState("favorites", {
      favorites: "favorites",
      isLoading: "isLoading",
    }),
  },

  methods: {
    ...mapActions("users", ["getUsers", "getUser", "getAlbum"]),
    ...mapActions("favorites", ["saveFavorites"]),
    changeSwitch(switchItem) {
      this.activeSwitch = switchItem;
    },
    onOpenAlbums(id) {
      this.isOpen = true;
      if (this.isOpen) {
        this.getUser(id).then((data) => {
          this.albums = data;
        });
      }
    },
    onOpenPhotos(userId, albumId) {
      this.getAlbum({ userId, albumId });
    },
  },
  mounted() {
    this.getUsers();
    this.saveFavorites(JSON.parse(localStorage.getItem("favorites")) || []);
  },
};
</script>

<style scoped lang="scss">
.main {
  &__container {
    display: flex;
    flex-direction: column;
    padding-top: 16px;
    flex: 1 1 auto;
  }

  &__list {
    ::v-deep .accordion {
      &__title {
        span {
          padding: 24px 0px;
        }
      }

      &__container-animation-wrapper {
        & > .accordion {
          padding-left: 56px;
        }
      }

      &__icon {
        flex: 0 0 auto;
        width: 32px;
        height: 32px;
        background-color: $Six;
        border-radius: 100%;

        &::after {
          display: inline-block;
          content: "";
          width: 100%;
          height: 100%;
          background-image: url("@/assets/icons/plus.svg");
          background-position: center;
          background-repeat: no-repeat;
        }
      }

      &__checkbox {
        &:checked {
          & ~ span {
            .accordion__icon {
              &::after {
                background-image: url("@/assets/icons/minus.svg");
              }
            }
          }
        }
      }
    }
  }

  &__case {
    display: flex;
    flex-direction: column;
    padding-top: 64px;
    min-height: 100vh;
  }

  &__favorites {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 42px;

    &-empty {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex: 1 1 auto;

      img {
        width: max-content;
        margin-bottom: 32px;
      }
    }

    &-title {
      text-align: center;
      margin-bottom: 8px;
    }

    &-text {
      text-align: center;
      font-size: 18px;
      line-height: 130%;
      color: $Three;
    }
  }
}
</style>

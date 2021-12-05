<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      links: []
    }
  },
  created() {
    this.links = [
      { text: 'Anasayfa', icon: 'house-door-fill', path: '/'},
      { text: 'Randevular', icon: 'calendar2-check-fill', path: '/appointments'},
      { text: 'Yeni Randevu Oluştur', icon: 'calendar-plus-fill', path: '/appointment/create'},
    ]
  },
  methods: {
    toggleCollapse() {
      if(window.innerWidth < 992) {
        this.$root.$emit('bv::toggle::collapse', 'menu-items')
      }
    }
  }
}
</script>

<template>
  <div class="sidebar">
    <div class="brand">
      <h1 class="brand-name">
        <span>Iceberg</span>
        <span>Estate</span>
      </h1>
      <b-icon
        class="menu-icon"
        icon="list"
        v-b-toggle="'menu-items'"
      />
    </div>
    <b-collapse id="menu-items" ref="collapse-item">
      <nav class="menu-links" id="menuLinks">
        <router-link
          v-for="(item, index) in links"
          :key="index"
          :to="item.path"
          exact
          class="menu-link"
          @click.native="toggleCollapse"
        >
          <b-icon :icon="item.icon" />
          <span>{{ item.text }}</span>
        </router-link>
      </nav>
    </b-collapse>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  background-color: var(--blue-01);
  height: 100%;
  color: var(--white-01);
  #menu-items {
    .menu-links {
      display: flex;
      flex-direction: column;
      justify-content: center;
      .menu-link {
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 2px; 
        transition: .4s;
        color: var(--white-01);
        &:hover {
          text-decoration: none;
        }
      }
      .router-link-exact-active {
        background: var(--blue-02);
        box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
        -webkit-box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
        -moz-box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
      }
    }
  }
}

@media screen and (min-width: 992px) {
  .sidebar {
    display: flex;
    flex-direction: column;
    padding: 30px 20px;
    .brand {
      .brand-name {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 32px;
        span:last-child {
          margin-top: 10px;
        }
      }
      .menu-icon {
        display: none;
      }
    }
    #menu-items {
      display: block! important;
      height: 100%;
      .menu-links {
        height: 100%;
        .menu-link {
          font-size: 16px;
          padding: 12px 0 10px 0;
          .b-icon {
            margin-bottom: 8px;
          }
          &:not(:last-child) {
            margin-bottom: 12px;  
          }
        }
      }
    }
  }
}

@media screen and (max-width: 991.9px) {
  .sidebar {
    .brand {
      width: 100%;
      height: 66px;
      padding: 0 16px 0 16px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .brand-name {
        font-size: 22px;
        margin: 0;
        span:last-child {
          margin-left: 6px;
        }
      }
      .menu-icon {
        font-size: 22px;
      }
    }
    #menu-items {
      .menu-links {
        padding: 0 20px 20px 20px;
        .menu-link {
          margin-bottom: 6px;
          padding: 8px 0 6px 0;
          font-size: 14px;
          .b-icon {
            margin-bottom: 4px;
          }
        }
      }
    }
  }
}

</style>

<template>
  <div class="vue-admin-beautiful-wrapper" :class="classObj">
    <div
      class="layout-container-vertical"
      :class="{
        fixed: header === 'fixed',
        'no-tabs-bar': tabsBar === 'false' || tabsBar === false,
      }"
    >
      <div
        v-if="device === 'mobile' && collapse === false"
        class="mask"
        @click="handleFoldSideBar"
      />
      <!--右侧目录-->
      <vab-side-bar />
      <div class="vab-main" :class="collapse ? 'is-collapse-main' : ''">
        <div :class="header === 'fixed' ? 'fixed-header' : ''">
          <vab-nav-bar />
        </div>
        <vab-app-main />
      </div>
    </div>
    <el-backtop />
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import { tokenName } from '@/config'
  export default {
    name: 'Layout',
    data() {
      return { oldLayout: '' }
    },
    computed: {
      ...mapGetters({
        layout: 'settings/layout',
        tabsBar: 'settings/tabsBar',
        collapse: 'settings/collapse',
        header: 'settings/header',
        device: 'settings/device',
      }),
      classObj() {
        return {
          mobile: this.device === 'mobile',
        }
      },
    },
    beforeMount() {
      window.addEventListener('resize', this.handleResize)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.handleResize)
    },
    mounted() {
      this.oldLayout = this.layout
      const userAgent = navigator.userAgent
      const isMobile = this.handleIsMobile()
      if (isMobile) {
        if (isMobile) {
          //横向布局时如果是手机端访问那么改成纵向版
          this.$store.dispatch('settings/changeLayout', 'vertical')
        } else {
          this.$store.dispatch('settings/changeLayout', this.oldLayout)
        }
        this.$store.dispatch('settings/toggleDevice', 'mobile')
        setTimeout(() => {
          this.$store.dispatch('settings/foldSideBar')
        }, 2000)
      } else {
        this.$store.dispatch('settings/openSideBar')
      }
      this.$nextTick(() => {
        window.addEventListener(
          'storage',
          (e) => {
            if (e.key === tokenName || e.key === null) window.location.reload()
            if (e.key === tokenName && e.value === null)
              window.location.reload()
          },
          false
        )
      })
    },
    methods: {
      ...mapActions({
        handleFoldSideBar: 'settings/foldSideBar',
      }),
      handleIsMobile() {
        return document.body.getBoundingClientRect().width - 1 < 992
      },
      handleResize() {
        if (!document.hidden) {
          const isMobile = this.handleIsMobile()
          if (isMobile) {
            //横向布局时如果是手机端访问那么改成纵向版
            this.$store.dispatch('settings/changeLayout', 'vertical')
          } else {
            this.$store.dispatch('settings/changeLayout', this.oldLayout)
          }

          this.$store.dispatch(
            'settings/toggleDevice',
            isMobile ? 'mobile' : 'desktop'
          )
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  @mixin fix-header {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: $base-z-index - 2;
    width: 100%;
    overflow: hidden;
  }

  .vue-admin-beautiful-wrapper {
    position: relative;
    width: 100%;
    height: 100%;

    .layout-container-vertical {
      position: relative;

      .mask {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: $base-z-index - 1;
        width: 100%;
        height: 100vh;
        overflow: hidden;
        background: #000;
        opacity: 0.5;
      }

      &.fixed {
        padding-top: calc(#{$base-nav-bar-height});
      }

      &.fixed.no-tabs-bar {
        padding-top: $base-nav-bar-height;
      }

      .vab-main {
        position: relative;
        min-height: 100%;
        margin-left: $base-left-menu-width;
        background: #f6f8f9;
        transition: $base-transition;

        ::v-deep {
          .fixed-header {
            @include fix-header;

            left: $base-left-menu-width;
            width: $base-right-content-width;
            box-shadow: $base-box-shadow;
            transition: $base-transition;
          }

          .nav-bar-container {
            position: relative;
            box-sizing: border-box;
          }

          .tabs-bar-container {
            box-sizing: border-box;
          }

          .app-main-container {
            width: calc(100% - #{$base-padding} - #{$base-padding});
            margin: $base-padding auto;
            background: $base-color-white;
            border-radius: $base-border-radius;
          }
        }

        &.is-collapse-main {
          margin-left: $base-left-menu-width-min;

          ::v-deep {
            .fixed-header {
              left: $base-left-menu-width-min;
              width: calc(100% - 65px);
            }
          }
        }
      }
    }

    /* 手机端开始 */
    &.mobile {
      ::v-deep {
        .el-pager,
        .el-pagination__jump {
          display: none;
        }

        .layout-container-vertical {
          .el-scrollbar.side-bar-container.is-collapse {
            width: 0;
          }

          .vab-main {
            width: 100%;
            margin-left: 0;
          }
        }

        .vab-main {
          .fixed-header {
            left: 0 !important;
            width: 100% !important;
          }
        }
      }
    }

    /* 手机端结束 */
  }
</style>

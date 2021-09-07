<template>
  <v-app id="inspire">
    <v-system-bar app>
      <v-spacer></v-spacer>

      <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-triangle</v-icon>
    </v-system-bar>

    <v-app-bar
      app
      clipped-right
      flat
      height="72"
      color="blue darken-2"
    >
      <h1>Discovery</h1>
      
      <v-spacer></v-spacer>

      <v-responsive max-width="156">
        <v-text-field
          dense
          flat
          hide-details
          rounded
          solo-inverted
          placeholder="Search"
        >
        </v-text-field>
      </v-responsive>
    </v-app-bar>

    <v-navigation-drawer permanent app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            <v-icon
              large
              color="blue darken-2"
            >
                fas fa-kiwi-bird 
            </v-icon> Kwitter
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

        <v-list
          dense
          nav
        >
          <v-list-item
            v-for="item in items"
            :key="item.title"
            :to="item.to"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>

    <v-navigation-drawer
      app
      clipped
      right
    >
      <v-list>
        <v-list-item
          v-for="n in 5"
          :key="n"
          link
        >
          <v-list-item-content>
            <v-list-item-title>Item {{ n }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
<!--  -->
    </v-main>

  </v-app>
</template>


<script>

  export default {
  
    data () {
      return {
        items: [
          { title: 'Home', icon: 'fas fa-home', to: '/Home/:profileId' },
          { title: 'Discovery', icon: 'fas fa-hashtag', to: '#' },
          { title: 'Profile', icon: 'fas fa-user-alt', to: '/Profile/:profileId' },
        ],
        right: null,
        drawer: null 
      }
    }
    
  }
</script>





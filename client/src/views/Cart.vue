<template>
  <div>
    <h2>Your Cart</h2><br>
    <b-table
      :items="$store.state.cart"
      :fields="fields"
      :sort-desc.sync="sortDesc"
    >
        <template slot="action" slot-scope="row">
            <b-button size="sm" @click="reduce(row.item, $event.target)" class="mr-1">
                -
            </b-button>
            <b-button size="sm" @click="add(row.item, $event.target)" class="mr-1">
                +
            </b-button>
            <b-button size="sm" @click="deleteItem(row.item, $event.target)" class="mr-1">
                Delete
            </b-button>
        </template>
    </b-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sortDesc: false,
      fields: [
        { key: 'name', sortable: true },
        { key: 'price', sortable: true },
        { key: 'quantity', sortable: true },
        { key: 'action' }
      ]
    }
  },
  methods: {
    add (item, button) {
      console.log(item)
      this.$store.dispatch('ADD_ITEMS', item)
      this.$store.dispatch('GET_PRODUCTS')
    },
    reduce (item, button) {
      console.log(item)
      this.$store.dispatch('ADD_ITEMS', item)
      this.$store.dispatch('GET_PRODUCTS')
    },
    deleteItem (item, button) {
      console.log(item)
      this.$store.dispatch('DELETE_ITEMS_CART', item)
    },
    updateCart(item){
      console.log(item)
    }
  }
}
</script>

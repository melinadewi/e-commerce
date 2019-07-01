<template>
  <div>
    <h2>Your Cart</h2><br>
    <b-table
      :items="$store.state.carts.items"
      :fields="fields"
      :sort-desc.sync="sortDesc"
    >
          <template slot="total_price" slot-scope="row">
            {{ row.item.price*row.item.quantity }}
        </template>
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
        { key: 'total_price', sortable: true },
        { key: 'action' }
      ],
      cartitems: {}
    }
  },
  methods: {
    add (item, button) {
      this.$store.dispatch('ADD_ITEMS', item._id)
    },
    reduce (item, button) {
      this.$store.dispatch('REDUCE_ITEMS', item._id)
    },
    deleteItem (item, button) {
      this.$store.dispatch('DELETE_ITEMS_CART', item._id)
    }
  }
}
</script>

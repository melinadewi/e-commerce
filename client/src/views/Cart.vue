<template>
  <div>
    <h2>Your Cart</h2><br>
    <b-table
      :items="items"
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
      ],
      items: [
        { quantity: 4, price: 1, name: 'Macdonald' },
        { quantity: 2, price: 2, name: 'Shaw' },
        { quantity: 9, price: 5, name: 'Wilson' },
        { quantity: 3, price: 3, name: 'Carney' }
      ]
    }
  },
  methods: {
    add (item, button) {
      console.log(item)
      item.quantity++
    },
    reduce (item, button) {
      console.log(item)
      item.quantity--
    },
    deleteItem (item, button) {
      console.log(item)
    }
  }
}
</script>

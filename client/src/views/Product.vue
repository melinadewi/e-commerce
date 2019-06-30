<template>
  <div>
    <router-link to="/" v-if="isAdmin">Edit Products</router-link>
    <FormAddProduct/>
    <b-card-group deck>
      <b-card title="Title" img-src="https://picsum.photos/300/300/?image=41" img-alt="Image" img-top>
        <b-card-text>
          Harga
        </b-card-text>
        <b-button href="#" variant="primary">Add to cart</b-button><br>
        <b-button href="#" variant="warning">Edit</b-button>
        <b-button href="#" variant="danger">Delete</b-button>
      </b-card>

      <b-card title="Title" img-src="https://picsum.photos/300/300/?image=41" img-alt="Image" img-top>
        <b-card-text>
          Harga
        </b-card-text>
        <b-button href="#" variant="primary">Add to cart</b-button>
        <b-button href="#" variant="warning">Edit</b-button>
        <b-button href="#" variant="danger">Delete</b-button>
      </b-card>

      <b-card title="Title" img-src="https://picsum.photos/300/300/?image=41" img-alt="Image" img-top>
        <b-card-text>
          Harga
        </b-card-text>
        <b-button href="#" variant="primary">Add to cart</b-button>
        <b-button href="#" variant="warning">Edit</b-button>
        <b-button href="#" variant="danger">Delete</b-button>
      </b-card>

      <b-card title="Title" img-src="https://picsum.photos/300/300/?image=41" img-alt="Image" img-top>
        <b-card-text>
          Harga
        </b-card-text>
        <b-button href="#" variant="primary">Add to cart</b-button>
        <b-button href="#" variant="warning">Edit</b-button>
        <b-button href="#" variant="danger">Delete</b-button>
      </b-card>

      <b-card title="Title" img-src="https://picsum.photos/300/300/?image=41" img-alt="Image" img-top>
        <b-card-text>
          Harga
        </b-card-text>
        <b-button href="#" variant="primary">Add to cart</b-button>
        <b-button href="#" variant="warning">Edit</b-button>
        <b-button href="#" variant="danger">Delete</b-button>
      </b-card>

      <b-card title="Title" img-src="https://picsum.photos/300/300/?image=41" img-alt="Image" img-top>
        <b-card-text>
          Harga
        </b-card-text>
        <b-button href="#" variant="primary">Add to cart</b-button>
        <b-button href="#" variant="warning">Edit</b-button>
        <b-button href="#" variant="danger">Delete</b-button>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import FormAddProduct from '@/components/FormAddProduct.vue'

export default {
  components: {
    FormAddProduct
  }
}
</script>

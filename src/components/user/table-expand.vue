<template>
    <div class="expand-row">
        <Row class="expand-row">
            {{row.text}}
        </Row>
    </div>
</template>

<script>
  import {
    Row,
    Col
  } from 'view-design'

  export default {
    name: 'table-expand',
    props: {
      row: Object
    },
    components: {
      Row,
      Col
    }
  }
</script>

<style scoped>
    .expand-row {
        margin-bottom: 16px;
    }
</style>

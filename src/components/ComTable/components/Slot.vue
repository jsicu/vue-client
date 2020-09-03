<script>
export default {
  name: 'TableSlot',
  functional: true,
  inject: ['tableRoot'],
  props: {
    row: {
      type: Object,
      default: () => null
    },
    index: {
      type: Number,
      default: () => null
    },
    column: {
      type: Object,
      default: () => null
    }
  },
  render: (h, ctx) => {
    return h('div', ctx.injections.tableRoot.$scopedSlots[ctx.props.column.key]({
      row: ctx.props.row,
      column: ctx.props.column,
      index: ctx.props.index
    }))
  }
}
</script>

<script>
export default {
  name: 'TableItem',
  functional: true,
  props: {
    row: {
      type: Object,
      default: () => {}
    },
    render: {
      type: Function,
      default: () => null
    },
    index: {
      type: Number,
      default: () => 0
    }
  },
  render(h, context) {
    const { render, row, index } = context.props
    return render(h, row, index)
  }
}
</script>

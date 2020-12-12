type Props = {
  categories: {
    edges: {
      node: {
        name: string
      }
    }[]
  }
}

export default function Categories({ categories }: Props) {
  return (
    <span className="ml-1">
      under
      {categories.edges.map((category, index) => (
        <span key={index} className="ml-1">
          {category.node.name}
        </span>
      ))}
    </span>
  )
}

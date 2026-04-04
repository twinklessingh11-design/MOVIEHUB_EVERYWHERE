const dateFormat = (date) => {
  const d = new Date(date)

  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  })
}

export default dateFormat
import { NextResponse } from "next/server"

// Define menu items
const menuItems = [
  {
    id: "1",
    name: "Chick-In Maple",
    category: "Signature Waffle",
    description: "Classic buttermilk chicken topped with maple syrup and chives with a delicious bubble waffle.",
    price: 12.99,
    imageUrl: "/images/menu/signature-waffle.jpg",
  },
  {
    id: "2",
    name: "Spicy Chick",
    category: "Signature Waffle",
    description: "Spicy buttermilk chicken with our signature hot sauce and pickles on a bubble waffle.",
    price: 13.99,
  },
  {
    id: "3",
    name: "Chick-In Fries",
    category: "Loaded Fries",
    description:
      "Our fresh crispy fries with shredded cheddar cheese buttermilk chicken drizzled in our signature chipotle sauce with ranch!",
    price: 9.99,
    imageUrl: "/images/menu/chick-in-fries.jpg",
  },
  {
    id: "4",
    name: "Queso Fries",
    category: "Loaded Fries",
    description:
      "Crispy fries topped with chicken drenched in our signature Monterey Jack queso sauce, shredded cheddar cheese, jalapeños, chives and ranch drizzle.",
    price: 10.99,
    imageUrl: "/images/menu/queso-fries.jpg",
  },
  {
    id: "5",
    name: "Chicken & Waffles",
    category: "Signature Waffle",
    description: "Our classic buttermilk chicken with a golden bubble waffle and maple syrup.",
    price: 11.99,
  },
  {
    id: "6",
    name: "Wings",
    category: "Sides",
    description: "Crispy wings tossed in your choice of sauce: Buffalo, BBQ, or Honey Garlic.",
    price: 8.99,
  },
  {
    id: "7",
    name: "Chicken Tenders",
    category: "Sides",
    description: "Hand-breaded chicken tenders served with your choice of dipping sauce.",
    price: 7.99,
  },
  {
    id: "8",
    name: "Mac & Cheese",
    category: "Sides",
    description: "Creamy mac & cheese topped with crispy breadcrumbs.",
    price: 5.99,
  },
]

export async function GET(req: Request) {
  try {
    // Get query parameters
    const url = new URL(req.url)
    const category = url.searchParams.get("category")
    const id = url.searchParams.get("id")

    // Filter by category if provided
    let filteredItems = menuItems
    if (category) {
      filteredItems = menuItems.filter((item) => item.category.toLowerCase() === category.toLowerCase())
    }

    // Filter by id if provided
    if (id) {
      filteredItems = menuItems.filter((item) => item.id === id)
    }

    return NextResponse.json(filteredItems)
  } catch (error) {
    console.error("Error fetching menu items:", error)
    return NextResponse.json({ error: "Failed to fetch menu items" }, { status: 500 })
  }
}

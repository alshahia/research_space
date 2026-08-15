/**
 * Medusa 2 link module (placeholder for Path B scaffold).
 *
 * In Medusa 2, a `Category` is a first-class entity managed inside the product
 * module — there is no separate `@medusajs/category` package on npm. Product
 * ↔ Category is linked via the product service:
 *
 *   await productService.createProductCategory({ name: "Apparel" })
 *   await productService.updateProducts(productId, { categories: [...] })
 *
 * For a true many-to-many link between a user-defined module and product (the
 * standard Medusa 2 link recipe) uncomment below:
 *
 *   import { defineLink, Modules } from "@medusajs/framework/utils"
 *   import ProductModule from "@medusajs/product"
 *
 *   export default defineLink(
 *     ProductModule.linkable.product,
 *     { linkable: Modules.PRODUCT_CATEGORY, field: "category_id" }
 *   )
 *
 * See: https://docs.medusajs.com/learn/fundamentals/module-links
 */

export default undefined

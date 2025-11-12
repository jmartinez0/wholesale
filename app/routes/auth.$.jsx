import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  const { admin } = await authenticate.admin(request);

  try {
    const definitions = [
      {
        name: "Wholesale Price",
        namespace: "wholesale",
        key: "price",
        type: "money",
        ownerType: "PRODUCTVARIANT",
        access: { storefront: "PUBLIC_READ" },
      },
      {
        name: "Wholesale Minimum Quantity",
        namespace: "wholesale",
        key: "minimum_quantity",
        type: "number_integer",
        ownerType: "PRODUCTVARIANT",
        access: { storefront: "PUBLIC_READ" },
      },
    ];

    const mutation = `
      mutation metafieldDefinitionCreate($definition: MetafieldDefinitionInput!) {
        metafieldDefinitionCreate(definition: $definition) {
          createdDefinition { id name key namespace type { name } access { storefront } }
          userErrors { field message }
        }
      }
    `;

    for (const def of definitions) {
      const res = await admin.graphql(mutation, { variables: { definition: def } });
      const json = await res.json();

      const errors = json?.data?.metafieldDefinitionCreate?.userErrors || [];
      if (errors.length > 0) {
        console.log(`Metafield "${def.key}" setup notice:`, errors);
      } else {
        console.log(`Created metafield definition: ${def.key}`);
      }
    }
  } catch (error) {
    console.error("Error ensuring metafield definitions:", error);
  }

  return null;
};

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};

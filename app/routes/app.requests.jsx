export default function Requests() {
  return (
    <s-page heading="Wholesale Access Requests">
      {loading ? (
        <s-spinner accessibilityLabel="Loading" size="large-100" />
      ) : (
        <s-stack direction="block" gap="base">
          <s-banner tone="info">
            The wholesale access requests feature is a work in progress. In the
            future, users will be able to fill out a request form and you can
            accept/deny their request here.
          </s-banner>
          <s-stack direction="inline" gap="base">
            <s-text-field
              icon="search"
              placeholder="Search anything"
              labelAccessibilityVisibility="Search anything"
            />
          </s-stack>

          <s-section padding="none">
            <s-table>
              <s-table-header-row>
                <s-table-header listSlot="primary">Email</s-table-header>
                <s-table-header>Company Name</s-table-header>
                <s-table-header>Phone Number</s-table-header>
                <s-table-header>Additional Info</s-table-header>
                <s-table-header>Status</s-table-header>
              </s-table-header-row>

              <s-table-body>
                <s-table-row>
                  <s-table-cell>email@example.com</s-table-cell>
                  <s-table-cell>Company Name</s-table-cell>
                  <s-table-cell>000-000-0000</s-table-cell>
                  <s-table-cell>
                    Hi, I would like to request wholesale access for Company
                    Name.
                  </s-table-cell>
                  <s-table-cell>
                    <s-badge tone="caution">Unreviewed</s-badge>
                  </s-table-cell>
                </s-table-row>
              </s-table-body>
            </s-table>
          </s-section>
        </s-stack>
      )}
    </s-page>
  );
}

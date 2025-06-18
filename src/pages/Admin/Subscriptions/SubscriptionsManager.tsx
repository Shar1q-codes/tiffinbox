import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllSubscriptions,
  Subscription,
  SubscriptionStatus,
  MealPlanType,
  getSubscriptionAnalytics,
} from "../../../services/subscriptionService";
import { formatPrice } from "../../../services/paymentService";

/**
 * SubscriptionsManager component for admin panel to manage all subscriptions
 */
const SubscriptionsManager: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState<SubscriptionStatus | "all">(
    "all"
  );
  const [planTypeFilter, setPlanTypeFilter] = useState<MealPlanType | "all">(
    "all"
  );
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Styles
  const containerStyle = {
    padding: "2rem",
    maxWidth: "1200px",
    margin: "0 auto",
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
  };

  const titleStyle = {
    fontSize: "2rem",
    fontWeight: "600",
    color: "#2b2b2b",
    margin: "0",
  };

  const analyticsContainerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "1rem",
    marginBottom: "2rem",
  };

  const analyticsCardStyle = {
    padding: "1.5rem",
    background: "#fef6e4",
    borderRadius: "10px",
    textAlign: "center" as const,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse" as const,
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
  };

  const thStyle = {
    padding: "1rem",
    textAlign: "left" as const,
    backgroundColor: "#f5f5f5",
  };

  const tdStyle = {
    padding: "1rem",
    borderBottom: "1px solid #eaeaea",
  };

  const buttonStyle = {
    background: "#d62828",
    color: "#ffffff",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    cursor: "pointer",
    fontFamily: "Poppins, sans-serif",
    fontWeight: "500",
  };

  const filterContainerStyle = {
    display: "flex",
    gap: "1rem",
    marginBottom: "1.5rem",
    flexWrap: "wrap",
  };

  const filterStyle = {
    padding: "0.5rem 1rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "0.9rem",
  };

  const searchStyle = {
    padding: "0.5rem 1rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "0.9rem",
    width: "300px",
    maxWidth: "100%",
  };

  // Status badge styling
  const getStatusBadgeStyle = (status: SubscriptionStatus) => {
    const baseStyle = {
      padding: "0.25rem 0.5rem",
      borderRadius: "100px",
      fontSize: "0.8rem",
      fontWeight: "500",
      display: "inline-block",
    };

    const statusColors = {
      active: { bg: "#e1fae1", color: "#1a8917" },
      paused: { bg: "#f9f3d9", color: "#c5a60c" },
      canceled: { bg: "#ffefef", color: "#d12828" },
      expired: { bg: "#f2f2f2", color: "#666666" },
      pending: { bg: "#e7f1ff", color: "#1a56db" },
    };

    const statusColor = statusColors[status] || statusColors.pending;

    return {
      ...baseStyle,
      backgroundColor: statusColor.bg,
      color: statusColor.color,
    };
  };

  // Fetch subscriptions and analytics data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [subs, analytics] = await Promise.all([
          getAllSubscriptions(),
          getSubscriptionAnalytics(),
        ]);
        setSubscriptions(subs);
        setAnalytics(analytics);
      } catch (error) {
        console.error("Error fetching subscription data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter subscriptions based on selected filters and search term
  const filteredSubscriptions = subscriptions.filter((subscription) => {
    // Apply status filter
    if (statusFilter !== "all" && subscription.status !== statusFilter) {
      return false;
    }

    // Apply plan type filter
    if (planTypeFilter !== "all" && subscription.planType !== planTypeFilter) {
      return false;
    }

    // Apply search term (search in customer name, email, or ID)
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const nameMatch = subscription.customerName
        ?.toLowerCase()
        .includes(searchLower);
      const emailMatch = subscription.customerEmail
        ?.toLowerCase()
        .includes(searchLower);
      const idMatch = subscription.id?.toLowerCase().includes(searchLower);

      if (!nameMatch && !emailMatch && !idMatch) {
        return false;
      }
    }

    return true;
  });

  // Handle click on a subscription row to navigate to the detail view
  const handleSubscriptionClick = (id: string) => {
    navigate(`/admin/subscriptions/${id}`);
  };

  // Format date to readable string
  const formatDate = (timestamp: any) => {
    if (!timestamp) return "N/A";

    try {
      // Handle Firestore Timestamp
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch (error) {
      return "Invalid Date";
    }
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Subscription Management</h1>
      </div>

      {/* Analytics Cards */}
      {analytics && (
        <div style={analyticsContainerStyle}>
          <div style={analyticsCardStyle}>
            <h3>Total Subscriptions</h3>
            <p
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                color: "#d62828",
                margin: "0.5rem 0",
              }}
            >
              {analytics.totalSubscriptions}
            </p>
          </div>
          <div style={analyticsCardStyle}>
            <h3>Active Subscriptions</h3>
            <p
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                color: "#1a8917",
                margin: "0.5rem 0",
              }}
            >
              {analytics.activeSubscriptions}
            </p>
          </div>
          <div style={analyticsCardStyle}>
            <h3>Paused</h3>
            <p
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                color: "#c5a60c",
                margin: "0.5rem 0",
              }}
            >
              {analytics.pausedSubscriptions}
            </p>
          </div>
          <div style={analyticsCardStyle}>
            <h3>Canceled</h3>
            <p
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                color: "#d12828",
                margin: "0.5rem 0",
              }}
            >
              {analytics.canceledSubscriptions}
            </p>
          </div>
          <div style={analyticsCardStyle}>
            <h3>Total Revenue</h3>
            <p
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                color: "#2b2b2b",
                margin: "0.5rem 0",
              }}
            >
              {formatPrice(analytics.totalRevenue)}
            </p>
          </div>
        </div>
      )}

      {/* Filters */}
      <div>
        <select
          style={filterStyle}
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as SubscriptionStatus | "all")
          }
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="paused">Paused</option>
          <option value="canceled">Canceled</option>
          <option value="expired">Expired</option>
          <option value="pending">Pending</option>
        </select>

        <select
          style={filterStyle}
          value={planTypeFilter}
          onChange={(e) =>
            setPlanTypeFilter(e.target.value as MealPlanType | "all")
          }
        >
          <option value="all">All Plans</option>
          <option value="veg">Vegetarian</option>
          <option value="non-veg">Non-Vegetarian</option>
        </select>

        <input
          type="text"
          placeholder="Search by name, email or ID..."
          style={searchStyle}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Subscriptions Table */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "2rem" }}>
          Loading subscriptions...
        </div>
      ) : (
        <>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Customer</th>
                <th style={thStyle}>Plan</th>
                <th style={thStyle}>Amount</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Start Date</th>
                <th style={thStyle}>Next Billing</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubscriptions.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    style={{ ...tdStyle, textAlign: "center", padding: "2rem" }}
                  >
                    No subscriptions found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredSubscriptions.map((subscription) => (
                  <tr
                    key={subscription.id}
                    onClick={() =>
                      subscription.id &&
                      handleSubscriptionClick(subscription.id)
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <td style={tdStyle}>
                      {subscription.id?.substring(0, 8)}...
                    </td>
                    <td style={tdStyle}>
                      <div>{subscription.customerName}</div>
                      <div style={{ fontSize: "0.8rem", color: "#666" }}>
                        {subscription.customerEmail}
                      </div>
                    </td>
                    <td style={tdStyle}>
                      {subscription.planType === "veg"
                        ? "Vegetarian"
                        : "Non-Vegetarian"}
                      <div style={{ fontSize: "0.8rem", color: "#666" }}>
                        {subscription.frequency}
                      </div>
                    </td>
                    <td style={tdStyle}>
                      {formatPrice(subscription.amount, subscription.currency)}
                    </td>
                    <td style={tdStyle}>
                      <span style={getStatusBadgeStyle(subscription.status)}>
                        {subscription.status.charAt(0).toUpperCase() +
                          subscription.status.slice(1)}
                      </span>
                    </td>
                    <td style={tdStyle}>
                      {formatDate(subscription.startDate)}
                    </td>
                    <td style={tdStyle}>
                      {formatDate(subscription.nextBillingDate)}
                    </td>
                    <td style={tdStyle}>
                      <button
                        style={buttonStyle}
                        onClick={(e) => {
                          e.stopPropagation();
                          subscription.id &&
                            handleSubscriptionClick(subscription.id);
                        }}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default SubscriptionsManager;

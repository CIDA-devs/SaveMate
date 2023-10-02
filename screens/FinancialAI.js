import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { PieChart } from "react-native-svg-charts";
import Icon from "react-native-vector-icons/FontAwesome";

const FinancialProjectionScreen = () => {
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [monthlyExpenses, setMonthlyExpenses] = useState([]);
  const [projectionMonths, setProjectionMonths] = useState("");
  const [results, setResults] = useState({
    totalExpenses: 0,
    remainingIncome: 0,
    monthlySavings: 0,
    projectedSavings: 0,
  });
  const [ruleResults, setRuleResults] = useState({
    necessities: 0,
    discretionary: 0,
    savings: 0,
    projectedSavings: 0,
    projectedDiscretionary: 0,
  });

  const handleAddExpense = () => {
    setMonthlyExpenses([...monthlyExpenses, { name: "", amount: "" }]);
  };

  const handleExpenseChange = (index, field, value) => {
    const newExpenses = [...monthlyExpenses];
    newExpenses[index][field] = value;
    setMonthlyExpenses(newExpenses);
  };

  const handleCalculate = () => {
    if (!monthlyIncome || !projectionMonths || monthlyExpenses.length === 0) {
      alert("Please enter all required fields and add at least one expense.");
      return;
    }

    const totalExpenses = monthlyExpenses.reduce(
      (sum, expense) => sum + (parseFloat(expense.amount) || 0),
      0
    );
    const remainingIncome = parseFloat(monthlyIncome) - totalExpenses;
    const monthlySavings = remainingIncome;
    const projectedSavings = monthlySavings * parseFloat(projectionMonths);

    setResults({
      totalExpenses,
      remainingIncome,
      monthlySavings,
      projectedSavings,
    });
  };
  const handleCalculateWithRule = () => {
    if (!monthlyIncome || !projectionMonths || monthlyExpenses.length === 0) {
      alert("Please enter all required fields and add at least one expense.");
      return;
    }

    const totalExpenses = monthlyExpenses.reduce(
      (sum, expense) => sum + parseFloat(expense.amount),
      0
    );
    const necessities = totalExpenses;
    const discretionary = (parseFloat(monthlyIncome) - totalExpenses) * 0.3;
    const projectedDiscretionary = discretionary * parseFloat(projectionMonths);
    const savings = (parseFloat(monthlyIncome) - totalExpenses) * 0.2;
    const projectedSavings = savings * parseFloat(projectionMonths);

    setRuleResults({
      necessities,
      discretionary,
      projectedDiscretionary,
      savings,
      projectedSavings,
    });
  };

  <View style={[styles.resultBox, styles.projectedDiscretionaryBox]}>
    <Icon name="shopping-cart" size={24} color="#f39c12" />
    <Text>
      Projected Discretionary: $
      {ruleResults ? ruleResults.projectedDiscretionary.toFixed(2) : "0.00"}
    </Text>
  </View>;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.title}>Expenses Calculator</Text>

      <Text style={styles.label}>Monthly Income:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter monthly income"
        keyboardType="numeric"
        value={monthlyIncome}
        onChangeText={setMonthlyIncome}
      />

      {monthlyExpenses.map((expense, index) => (
        <View key={index} style={styles.expenseRow}>
          <TextInput
            style={styles.expenseInput}
            placeholder="Expense Name"
            value={expense.name}
            onChangeText={(name) => handleExpenseChange(index, "name", name)}
          />
          <TextInput
            style={styles.expenseInput}
            placeholder="Amount"
            keyboardType="numeric"
            value={expense.amount.toString()}
            onChangeText={(amount) =>
              handleExpenseChange(index, "amount", amount)
            }
          />
        </View>
      ))}

      <TouchableOpacity style={styles.addButton} onPress={handleAddExpense}>
        <Icon name="plus" size={20} color="#fff" />
        <Text style={styles.addButtonText}>Add Expense</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Projection Period (Months):</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter number of months"
        keyboardType="numeric"
        value={projectionMonths}
        onChangeText={setProjectionMonths}
      />
      <TouchableOpacity
        style={styles.calculateButton}
        onPress={handleCalculate}
      >
        <Text style={styles.calculateButtonText}>Calculate</Text>
      </TouchableOpacity>

      <View style={styles.resultsContainer}>
        <Text style={styles.resultTitle}>Results</Text>
        <View style={styles.resultBoxesContainer}>
          <View style={[styles.resultBox, styles.totalExpenseBox]}>
            <Icon name="minus-circle" size={24} color="#e74c3c" />
            <Text>
              Total Expenses: $
              {results ? results.totalExpenses.toFixed(2) : "0.00"}
            </Text>
          </View>
          <View style={[styles.resultBox, styles.monthlySavingsBox]}>
            <Icon name="save" size={24} color="#2ecc71" />
            <Text>
              Monthly Savings: $
              {results ? results.monthlySavings.toFixed(2) : "0.00"}
            </Text>
          </View>
        </View>
        <View style={styles.resultBoxesContainer}>
          <View style={[styles.resultBox, styles.annualSavingsBox]}>
            <Icon name="bank" size={24} color="#3498db" />
            <Text>
              Annual Savings: $
              {(results ? results.monthlySavings * 12 : 0).toFixed(2)}
            </Text>
          </View>
          <View style={[styles.resultBox, styles.projectionBox]}>
            <Icon name="line-chart" size={24} color="#8e44ad" />
            <Text>
              Projection for {projectionMonths} months: $
              {(results ? results.projectedSavings : 0).toFixed(2)}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.calculateButton}
        onPress={handleCalculateWithRule}
      >
        <Text style={styles.calculateButtonText}>
          Calculate with 50/30/20 Rule
        </Text>
      </TouchableOpacity>

      <View style={styles.resultsContainer}>
        <Text style={styles.resultTitle}>Results (With 50/30/20 Rule)</Text>
        <View style={styles.resultBoxesContainer}>
          <View style={[styles.resultBox, styles.necessitiesBox]}>
            <Icon name="home" size={24} color="#3498db" />
            <Text>
              Necessities: $
              {ruleResults ? ruleResults.necessities.toFixed(2) : "0.00"}
            </Text>
          </View>
          <View style={[styles.resultBox, styles.discretionaryBox]}>
            <Icon name="shopping-cart" size={24} color="#2ecc71" />
            <Text>
              Discretionary: $
              {ruleResults ? ruleResults.discretionary.toFixed(2) : "0.00"}
            </Text>
          </View>
          <View style={[styles.resultBox, styles.savingsBox]}>
            <Icon name="bank" size={24} color="#e74c3c" />
            <Text>
              Savings: ${ruleResults ? ruleResults.savings.toFixed(2) : "0.00"}
            </Text>
          </View>
        </View>
        <View style={styles.resultBoxesContainer}>
          <View style={[styles.resultBox, styles.projectedSavingsBox]}>
            <Icon name="line-chart" size={24} color="#8e44ad" />
            <Text>
              Projected Savings: $
              {ruleResults ? ruleResults.projectedSavings.toFixed(2) : "0.00"}
            </Text>
          </View>
          <View style={[styles.resultBox, styles.projectedDiscretionaryBox]}>
            <Icon name="shopping-cart" size={24} color="#f39c12" />
            <Text>
              Projected Discretionary: $
              {ruleResults
                ? ruleResults.projectedDiscretionary.toFixed(2)
                : "0.00"}
            </Text>
          </View>
        </View>
      </View>
      {ruleResults && (
        <View style={styles.explanationContainer}>
          <Text style={styles.explanationTitle}>
            Explanation of Calculations (With 50/30/20 Rule)
          </Text>
          <Text style={styles.explanationText}>
            Total Monthly Expenses: ${ruleResults.necessities.toFixed(2)}
          </Text>
          <Text style={styles.explanationText}>
            Monthly Discretionary Spending: $
            {ruleResults.discretionary.toFixed(2)} = (30% of remaining income
            after expenses)
          </Text>
          <Text style={styles.explanationText}>
            Projected Discretionary Spending for {projectionMonths} months: $
            {(ruleResults.discretionary * parseFloat(projectionMonths)).toFixed(
              2
            )}
          </Text>
          <Text style={styles.explanationText}>
            Monthly Savings: ${ruleResults.savings.toFixed(2)} = (20% of
            remaining income after expenses)
          </Text>
          <Text style={styles.explanationText}>
            Projected Savings for {projectionMonths} months: $
            {ruleResults.projectedSavings.toFixed(2)}
          </Text>
          <View>
            <Text style={styles.explanationTitle1}>
              What is the 50/30/20 Rule?
            </Text>

            <Text style={styles.explanationTitle}>
              The 50/30/20 rule is a simple budgeting guideline to help people
              manage their money effectively. Here's how it breaks down:
            </Text>
            <Text style={styles.explanationText1}>
              50% for Necessities: Half of your income should go towards
              essential expenses like housing, utilities, groceries, and other
              basic needs. These are costs you can't avoid and need to pay to
              maintain your standard of living.
            </Text>
            <Text style={styles.explanationText1}>
              30% for Discretionary (Optional) Spending: Thirty percent of your
              income can be allocated to things you want but don't necessarily
              need. This includes entertainment, dining out, hobbies, or other
              fun activities. It's the part of your budget that allows you to
              enjoy life, but within limits.
            </Text>
            <Text style={styles.explanationText1}>
              20% for Savings and Debt Repayment: The remaining twenty percent
              should be saved for the future or used to pay down debt. This
              includes savings, investments, and debt repayments beyond the
              minimum payments.
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80,
    marginBottom: 20,
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  calculateButton: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  calculateButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  expenseRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  expenseInput: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  addButtonText: {
    color: "#fff",
    marginLeft: 5,
  },
  resultsContainer: {
    marginTop: 20,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  resultBoxesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  resultBox: {
    flex: 0.48,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  totalExpenseBox: {
    backgroundColor: "#f5d7e0",
  },
  monthlySavingsBox: {
    backgroundColor: "#d5e8d4",
  },
  annualSavingsBox: {
    backgroundColor: "#dae8fc",
  },
  projectionBox: {
    backgroundColor: "#e1d5e7",
  },
  chartContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  legendContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendColor: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  legendText: {
    fontSize: 14,
  },
  explanationContainer: {
    padding: 16,
    marginVertical: 20,
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
  },
  explanationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  explanationTitle1: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
  },
  explanationText: {
    fontSize: 14,
    marginBottom: 5,
  },
  explanationText1: {
    fontSize: 17,
    marginTop: 10,
    fontWeight: "300",
    marginBottom: 5,
  },
});

export default FinancialProjectionScreen;

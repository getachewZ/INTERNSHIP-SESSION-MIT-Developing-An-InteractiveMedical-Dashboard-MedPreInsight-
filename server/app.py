from flask import Flask, request, jsonify
from sklearn.linear_model import LinearRegression  # Added import
from sklearn.metrics import accuracy_score, classification_report,confusion_matrix,roc_curve,auc
from sklearn.model_selection import train_test_split,GridSearchCV
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.ensemble import VotingClassifier
from imblearn.over_sampling import SMOTE
import matplotlib.pyplot as plt
from sklearn.svm import SVC
from flask_cors import CORS
import seaborn as sns
import pandas as pd
import numpy as np
import matplotlib
import base64
import io

app = Flask(__name__)
CORS(app)
cors = CORS(app, resources={r"/predict": {"origins": "*"}})
matplotlib.use('Agg')

# Load and preprocess data
data = pd.read_csv('diabetes.csv')   # supervised target column
X = data.drop('Outcome', axis=1)
y = data['Outcome']

# Data Augmentation using SMOTE
smote = SMOTE(random_state=42)
X_resampled, y_resampled = smote.fit_resample(X, y)

X_train, X_test, y_train, y_test = train_test_split(X_resampled, y_resampled, test_size=0.2, random_state=42)

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Define SVM classifier
svm_linear = SVC(kernel='linear', probability=True)
svm_rbf = SVC(kernel='rbf', probability=True)
svm_poly = SVC(kernel='poly', probability=True)
svm_sigmoid = SVC(kernel='sigmoid', probability=True)

# Define ensemble classifier using VotingClassifier
ensemble_classifier = VotingClassifier(estimators=[
    ('svm_linear', svm_linear),
    ('svm_rbf', svm_rbf),
    ('svm_poly', svm_poly),
    ('svm_sigmoid', svm_sigmoid)], voting='soft')

# Fit ensemble classifier
ensemble_classifier.fit(X_train_scaled, y_train)

# Initialize and train the Random Forest classifier
rf_model = RandomForestClassifier( random_state=42)
#  use GridSearchCV for hyperparametr
param_grid = {
  'n_estimators': [50, 100, 200],
    'max_depth': [None, 10, 20],
    'min_samples_split': [2, 5, 10]
}

grid_search = GridSearchCV(estimator=rf_model, param_grid=param_grid, cv=5)
grid_search.fit(X_train, y_train)
best_rf_model = grid_search.best_estimator_

@app.route('/predict', methods=['POST'])
def predict():
    # Get input data from the request
    input_data = request.json
    if input_data is None:
        return jsonify({'error': 'Input data is missing'}), 400

    input_df = pd.DataFrame([input_data])
    input_scaled = scaler.transform(input_df)
    # Make predictions for svm
    svm_predictions = ensemble_classifier.predict(input_scaled)
      # Make predictions for the randomforest
    rf_predictions = best_rf_model.predict(input_df)
     # Generate confusion matrix svm  
    cm = confusion_matrix(y_test ,ensemble_classifier.predict(X_test_scaled))
     # Generate confusion matrix for randomforest
    conf_matrix = confusion_matrix(y_test, best_rf_model.predict(X_test))
    report = classification_report(y_test ,ensemble_classifier.predict(X_test_scaled))

     # Generate classification report
    class_report = classification_report(y_test, best_rf_model.predict(X_test))

    # Calculate accuracy score for svm
    svm_accuracy_test = accuracy_score(y_test, ensemble_classifier.predict(X_test_scaled))
    # Calculate accuracy score for randomforest
    accuracy = accuracy_score(y_test, best_rf_model.predict(X_test))

    # Compute ROC curve and ROC area for each class
    fpr, tpr, _ = roc_curve(y_test, ensemble_classifier.predict_proba(X_test_scaled)[:, 1])
    roc_auc = auc(fpr, tpr)
     # Plot ROC curve
    plt.figure(figsize=(8, 6))
    plt.plot(fpr, tpr, color='darkorange', lw=2, label='ROC curve (area = %0.2f)' % roc_auc)
    plt.plot([0, 1], [0, 1], color='navy', lw=2, linestyle='--')
    plt.xlim([0.0, 1.0])
    plt.ylim([0.0, 1.05])
    plt.xlabel('False Positive Rate')
    plt.ylabel('True Positive Rate')
    plt.title('ROC Curve')
    plt.legend(loc="lower right")
    plt.tight_layout()

    buffer = io.BytesIO()
    plt.savefig(buffer, format='png')
    buffer.seek(0)
    roc_curve_base64 = base64.b64encode(buffer.getvalue()).decode('utf-8')
    buffer.close()
    # Generate confusion matrix heatmap for svm
    cm_df = pd.DataFrame(cm, index=['Actual 0', 'Actual 1'], columns=['Predicted 0', 'Predicted 1'])
    plt.figure(figsize=(8,6))
    sns.heatmap(cm_df, annot=True, cmap='Blues', fmt='g')
    plt.title('Confusion Matrix')
    plt.xlabel('Predicted label')
    plt.ylabel('True label')
    plt.tight_layout()

    buffer = io.BytesIO()
    plt.savefig(buffer, format='png')
    buffer.seek(0)

    heatmap1_base64 = base64.b64encode(buffer.getvalue()).decode('utf-8')
    buffer.close()

    # Generate confusion matrix heatmap for randomforest
    plt.figure(figsize=(8, 6))
    sns.heatmap(conf_matrix, annot=True, cmap='Blues', fmt='g')
    plt.xlabel('Predicted labels')
    plt.ylabel('True labels')
    plt.title('Confusion Matrix')
    
    # Convert the heatmap to base64 string
    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    buf.seek(0)
    heatmap_base64 = base64.b64encode(buf.getvalue()).decode('utf-8')
    feature_importances = best_rf_model.feature_importances_
    # Generate feature importance graph
    feature_importance_graph = generate_feature_importance_graph(X_train.columns, feature_importances)
    
    rf_probabilities = best_rf_model.predict_proba(X_test)[:, 1]
    fpr, tpr, thresholds = roc_curve(y_test, rf_probabilities)
    roc_auc1 = auc(fpr, tpr)

    # Plot ROC curve
    plt.figure(figsize=(8, 6))
    plt.plot(fpr, tpr, color='darkorange', lw=2, label='ROC curve (area = %0.2f)' % roc_auc)
    plt.plot([0, 1], [0, 1], color='navy', lw=2, linestyle='--')
    plt.xlim([0.0, 1.0])
    plt.ylim([0.0, 1.05])
    plt.xlabel('False Positive Rate')
    plt.ylabel('True Positive Rate')
    plt.title('Receiver Operating Characteristic (ROC) Curve')
    plt.legend(loc="lower right")
    plt.grid(True)

    # Convert the ROC curve plot to base64 string
    roc_buf = io.BytesIO()
    plt.savefig(roc_buf, format='png')
    roc_buf.seek(0)
    roc_curve1_base64 = base64.b64encode(roc_buf.getvalue()).decode('utf-8')

    # Return the predictions, graph data, and accuracy score as JSON
    return jsonify({
        'svm_predictions': svm_predictions.tolist(),
        'confusion_matrix1':cm.tolist(),
        'classification_report1': report,
        'svm_accuracy_test': svm_accuracy_test,
        'heatmap1':heatmap1_base64,
        'roc_curve':roc_curve_base64,
        'roc_curve1':roc_curve1_base64,
        'rf_predictions': rf_predictions.tolist(),
        'accuracy': accuracy,
        'heatmap':heatmap_base64,
        'confusion_matrix': conf_matrix.tolist(),
        'classification_report': class_report,
        'graph': feature_importance_graph
        
    })

def generate_feature_importance_graph(input_features, importances):
    # Sort feature importances in descending order
    indices = np.argsort(importances)[::-1]
    sorted_importances = importances[indices]
    sorted_input_features = [input_features[i] for i in indices]

    # Create the graph
    plt.figure(figsize=(10, 6))
    plt.bar(sorted_input_features, sorted_importances, color='green')
    plt.xlabel('Feature')
    plt.ylabel('Importance')
    plt.title('Feature Importances')

    # Convert the graph to base64 string
    graph_buf = io.BytesIO()
    plt.savefig(graph_buf, format='png')
    plt.close()
    graph_buf.seek(0)
    graph_str = base64.b64encode(graph_buf.read()).decode('utf-8')

    return f"data:image/png;base64,{graph_str}"
@app.route('/predict_visits', methods=['POST'])
def predict_visits():
    data = request.json
    patients = data['patients']
    df = pd.DataFrame({
        'Month_Num': np.arange(1, 13),
        'Patients': patients
    })
    X_visits = df[['Month_Num']]
    y_visits = df['Patients']
    model = LinearRegression()
    model.fit(X_visits, y_visits)
    future_months = np.arange(13, 25).reshape(-1, 1)
    predictions = model.predict(future_months)
    return jsonify(predictions.tolist())

if __name__ == '__main__':
    app.run(debug=True, port=8000)
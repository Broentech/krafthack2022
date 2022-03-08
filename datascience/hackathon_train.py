import pickle
import os
import numpy as np
import joblib
from sklearn.preprocessing import RobustScaler
import xgboost as xgb
from sklearn.svm import SVR
from sklearn.svm import NuSVR
from sklearn.linear_model import ElasticNet
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.model_selection import GridSearchCV
from sklearn.metrics import mean_absolute_percentage_error


def retrain_model(tensile_number, X_train, y_train, X_test, y_test):
    scaler = RobustScaler()
    scaler.fit(X_train)
    X_train = scaler.transform(X_train)
    X_test = scaler.transform(X_test)

    scaler_name = "Bolt_" + str(tensile_number) + "_" + "Tensile_" + "scaler" + ".pkl"

    with open(scaler_name, 'wb') as f:
        pickle.dump(scaler, f)
        f.close()

    xgb_parameters = {
        # 'model__nthread':[4], #when use hyperthread, xgboost may become slower
        # 'model__learning_rate': [0.01], #so called `eta` value
        'model__max_depth': [3, 5, 7],
        # 'model__min_child_weight': [3, 5],
        # 'model__silent': [1],
        # 'model__subsample': [0.5, 1],
        # 'model__colsample_bytree': [0.5, 1],
        'model__n_estimators': [500, 1000]
    }

    gbdt_parameters = {
        'model__n_estimators': [10, 50, 100],
        'model__max_depth': [2, 3, 4]
    }

    svr_parameters = {
        'model__C': [0.00001, 1, 100, 10e5],
        'model__epsilon': [0.1, 0.001, 0.00001]
    }

    nusvr_parameters = {
        'model__C': [0.001, 10, 10e5],
        'model__nu': [0.1, 0.0001]
    }

    elsnet_parameters = {
        'alpha': np.linspace(0.01, 1, 30),
        'l1_ratio': np.linspace(0.01, 1, 30)
    }

    model_and_param = [
        (
            xgb.XGBRegressor(),
            xgb_parameters,
            "xgboost"
        ),

        (
            SVR(),
            svr_parameters,
            "svr"
        ),

        (
            NuSVR(),
            nusvr_parameters,
            "nusvr"
        ),

        (
            ElasticNet(),
            elsnet_parameters,
            "elasticnet"
        ),

        (
            GradientBoostingRegressor(),
            gbdt_parameters,
            "gbdt"
        )
    ]

    for regressor in model_and_param:
        model_type = regressor[2]

        # Create the model
        model = regressor[0]

        # Specify the hyperparameter's space
        parameters = regressor[1]

        # Create the GridSearchCV object: gm_cv
        gm_cv = GridSearchCV(model, param_grid=parameters, scoring='neg_mean_squared_error', cv=2)

        # Fit to the training set
        gm_cv.fit(X_train, y_train)

        # Get the mean absolute percentage error score on the testing set
        y_pred = gm_cv.predict(X_test)
        mape_pred = mean_absolute_percentage_error(y_test, y_pred)

        # Pickle the best model for using in production
        if model_type == "xgboost":
            pickle_name = "Bolt_" + str(tensile_number) + "_" + "Tensile_" + model_type + ".json"
            model.save_model(pickle_name)
        else:
            pickle_name = "Bolt_" + str(tensile_number) + "_" + "Tensile_" + model_type + ".pkl"
            joblib.dump(gm_cv.best_estimator_, pickle_name)

        # Report the prediction results
        print("Tuned parameter for {0}: {1}".format(model_type, gm_cv.best_params_))
        print("Tuned MAPE for {0}: {1}".format(model_type, mape_pred))

# Negotiating Your Compensation as a Software Engineer: A Prediction Problem Using Regression Techniques

## Quickstart

This repository is the codebase backing the above titled paper. Open the Jupyter notebooks in the top-level directory; they already contain the relevant output. The best order to look at the notebooks would be `Data Cleaning.ipynb`, then `Data Preparation.ipynb`, and finally `Data Prediction/Analysis - Untransformed.ipynb`. Feel free to also look at `Data Prediction/Analysis - Log Transformed.ipynb`, but this notebook doesn't contain the best models and is very similar to the untransformed version. `Data Random Exploration` does not provide much value and was purely for personal exploration.

If you would like to re-run the notebooks, make sure that you have Anaconda installed with all the relevant data analysis packages and install the remaining dependencies with `pip install -r requirements.txt`.

## Directory Structure

```
.
├── requirements.txt               
├── Data Cleaning.ipynb
├── Data Preparation.ipynb
├── Data Prediction/Analysis - Untransformed.ipynb
├── Data Prediction/Analysis - Log Transformed.ipynb
├── Data Random Exploration.ipynb
└── data/
    ├── raw_comp_data.json
    ├── raw_comp_data.csv
    ├── clean_comp_data.csv
    ├── prepped_comp_data.csv
    ├── prepped_comp_data_interactions.csv
    └── site-code/
```

### `requirements.txt`

This contains the necessary dependencies beyond what Anaconda provides. Currently, it contains packages necessary for fuzzy string matching.

### `Data Cleaning.ipynb`

This notebook represents the first step in the process. It takes `data/raw_comp_data.json` as input, quickly generates `data/raw_comp_data.csv` for records, and finally outputs `data/clean_comp_data.csv`. This notebook primarily fixes inconsistent compensation inputs (`salary`, `stock`, and `bonus`), scales them to the same numerical range, and performs some light cleaning/pruning on various other features. It contains 122 lines of code.

### `Data Preparation.ipynb`

This notebook represents the second step in the process. It takes `data/clean_comp_data.csv` as input and outputs `prepped_comp_data.csv` and `prepped_comp_data_interactions.csv`. This notebook primarily combines seemingly similar categorical entries (e.g., 'Amazon', 'amazon', and 'Amazon Web Services'), performs filtering on the most common categorical values above certain thresholds, creates dummy variables for the filtered categoricals, normalizes numerical features with standard normal scaling, and log transforms the target values. Interaction terms are also introduced that cross (1) `company` and `level`, and (2) `company` and `location`, which are only present in `prepped_comp_data_interactions.csv`. At the end, some light analysis is performed on the resulting data. It contains 186 lines of code.

### `Data Prediction/Analysis - Untransformed.ipynb`

This notebook represents the final step in the process, though using non-log-transformed target values. It takes `prepped_comp_data_interactions.csv` as input. It performs model selection on the training set using ridge, lasso, and partial least squares regressions, on each of the `salary`, `stock`, and `bonus` targets. Finally, it takes the winning models for each and performs prediction on the test set and evaluates the model's performance. It also analyzes the resulting coefficients from the winning regression models. It contains 198 lines of code.

### `Data Prediction/Analysis - Log Transformed.ipynb`

This notebook does the exact same thing as `Data Prediction/Analysis - Untransformed.ipynb`, except using log-transformed target values. It contains 182 lines of code.

### `Data Random Exploration.ipynb`

This notebook has some light, incomplete experimentation with other model types, such as multilayer perceptrons (MLP). It does not contain any results relevant to the outcomes in the final paper. It contains 95 lines of code.

### `data/raw_comp_data.json`

This is data taken directly from [Levels.fyi](http://levels.fyi/) as is, from web page network calls. Unfortunately, it contains inconsistent input, such as different scaling (some give the full number and some give the number in 1000's).

### `data/raw_comp_data.csv`

This data is a direct transformation from `raw_comp_data.json` that occurs in `Data Cleaning.ipynb`. 

### `data/clean_comp_data.csv`

This data contains clean versions of the compensation inconsistencies in `raw_comp_data.csv` and is generated by `Data Cleaning.ipynb`. 

### `data/prepped_comp_data.csv`

This is the final version of the data, ready for analysis, created by `Data Preparation.ipynb`. It contains log transformed target values, standard normalized years values, and dummy variables for the categorical variables. Specifically, it contains (1) log transformed total compensation, (2) log transformed salary, (3) log transformed stock, (4) log transformed bonus, (5) standard normalized years of experience, (6) standard normalized years at the company, (7) the company dummies, (8) the location dummies, and (9) the tag/specialization dummies.

### `data/prepped_comp_data_interactions.csv`

This is the final version of the data, ready for analysis, created by `Data Preparation.ipynb`. It has everything that `data/prepped_comp_data.csv` has, and more. Specifically, it also contains (1) the company/level interaction term dummies and (2) the company/location interaction term dummies.

### `data/site_code/`

This code is not directly used in the project. It comes from [Levels.fyi](http://levels.fyi/) as is, from web page network calls. It is used as reference for how best to clean the compensation values in the raw data. All the code here is in JavaScript and certain relevant snippets have been ported over to Python.
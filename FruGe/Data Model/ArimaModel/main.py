import datetime
import pandas as pd
# from statsmodels.tsa.stattools import adfuller
from pmdarima import auto_arima
import warnings
from statsmodels.tsa.arima_model import ARIMA
from sklearn.metrics import mean_squared_error
from math import sqrt
import time
import pymongo
from pymongo.errors import DuplicateKeyError
from statsmodels.tsa.stattools import adfuller

warnings.filterwarnings("ignore")

# Loading data from the dataset
data = pd.read_excel('prices.xlsx', index_col='Day', parse_dates=True)
# Dropping null values in the dataset
data = data.dropna()
print(data)
print('Shape of data', data.shape)

# Connection with the mongo atlas database Fruge
mongo_uri = "mongodb+srv://fruge:frugedatabase@frugedatabase.4krmx.mongodb.net/test"
client = pymongo.MongoClient(mongo_uri)
db = client.Fruge


# Check whether data is stationary(p value < 0.05)
def adf_test(dataset):
    data_test = adfuller(dataset, autolag='AIC')
    print("1. ADF : ", data_test[0])
    print("2. P-Value : ", data_test[1])
    print("3. Num Of Lags : ", data_test[2])
    print("4. Num Of Observations Used For ADF Regression:", data_test[3])
    print("5. Critical Values :")
    for key, val in data_test[4].items():
        print("\t", key, ": ", val)


# find the best arima model for beans
def find_suitable_model(item_name):
    adf_test(data[item_name])
    fit_stepwise = auto_arima(data[item_name], trace=True, suppress_warnings=True)
    fit_stepwise.summary()


# training and testing data for accuracy
def train_and_test_data(item_name, p, q, r):
    train_data = data.iloc[: -30]
    test_data = data.iloc[-30:]
    model = ARIMA(train_data[item_name], order=(p, q, r))
    model = model.fit(disp=0)
    model.summary()

    start = len(train_data)
    end = len(train_data) + len(test_data) - 1
    predict_test = model.predict(start=start, end=end, typ='levels')
    predict_test.index = data.index[start:end + 1]
    # print(predict_test)

    # mean = test_data['Beans'].mean()
    # print(mean)

    root_mean_square_error = sqrt(mean_squared_error(predict_test, test_data[item_name]))
    root_mean_square_error = "{:.2f}".format(root_mean_square_error)
    return root_mean_square_error


# dataset ending date
dataset_end_date = datetime.date(2021, 4, 21)
today_date = datetime.date.today()
# dates elapsed up to today from 2021-4-21
no_of_days_elapsed = int((today_date - dataset_end_date).days)

# Getting the date of 13 days ahead from today to predict the next week price
td = datetime.timedelta(days=13)
end_date = datetime.date.today() + td


def predict_price(predict, item_name, p, q, r, item_id):
    week_predicted_price = 0
    next_week_predicted_price = 0
    tomorrow_date = 0
    next_week_date = 0

    print(predict)

    predict = predict.values

    # Predicting today price
    predict_day1 = predict[no_of_days_elapsed]

    # Predicting tomorrow price
    predict_day2 = predict[no_of_days_elapsed + 1]

    # Making the results to two decimal places
    today_price = "{:.2f}".format(predict_day1)
    tomorrow_price = "{:.2f}".format(predict_day2)

    print("Price of", item_name, "for today", today_price)
    print("Price of", item_name, "for tomorrow", tomorrow_price)

    # Getting the days of the week as the program runs everyday
    week_days = ("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday")
    date = today_date.weekday()
    date_string = week_days[date]

    if date_string == "Sunday":

        # Predicting this week prices
        predict_sunday = predict[no_of_days_elapsed]
        predict_monday = predict[no_of_days_elapsed + 1]
        predict_tuesday = predict[no_of_days_elapsed + 2]
        predict_wednesday = predict[no_of_days_elapsed + 3]
        predict_thursday = predict[no_of_days_elapsed + 4]
        predict_friday = predict[no_of_days_elapsed + 5]

        week_predicted_price = int(predict_sunday + predict_monday + predict_tuesday + predict_wednesday +
                                   predict_thursday + predict_friday) / 6
        week_predicted_price = "{:.2f}".format(week_predicted_price)
        print("This week predicted price for", item_name, week_predicted_price)

        # Predicting next week prices
        predict_next_sunday = predict[no_of_days_elapsed + 7]
        predict_next_monday = predict[no_of_days_elapsed + 8]
        predict_next_tuesday = predict[no_of_days_elapsed + 9]
        predict_next_wednesday = predict[no_of_days_elapsed + 10]
        predict_next_thursday = predict[no_of_days_elapsed + 11]
        predict_next_friday = predict[no_of_days_elapsed + 12]

        next_week_predicted_price = int(predict_next_sunday + predict_next_monday + predict_next_tuesday +
                                        predict_next_wednesday + predict_next_thursday + predict_next_friday) / 6
        next_week_predicted_price = "{:.2f}".format(next_week_predicted_price)
        print("Next week predicted price for", item_name, next_week_predicted_price)

        # finding the tomorrow and next week date
        td1 = datetime.timedelta(days=1)
        td2 = datetime.timedelta(days=7)
        tomorrow_date = today_date + td1
        next_week_date = datetime.date.today() + td2

    elif date_string == "Monday":

        # Predicting this week prices
        predict_sunday = predict[no_of_days_elapsed - 1]
        predict_monday = predict[no_of_days_elapsed]
        predict_tuesday = predict[no_of_days_elapsed + 1]
        predict_wednesday = predict[no_of_days_elapsed + 2]
        predict_thursday = predict[no_of_days_elapsed + 3]
        predict_friday = predict[no_of_days_elapsed + 4]

        week_predicted_price = int(predict_sunday + predict_monday + predict_tuesday + predict_wednesday
                                   + predict_thursday + predict_friday) / 6
        week_predicted_price = "{:.2f}".format(week_predicted_price)
        print("This week predicted price for", item_name, week_predicted_price)

        # Predicting next week prices
        predict_next_sunday = predict[no_of_days_elapsed + 6]
        predict_next_monday = predict[no_of_days_elapsed + 7]
        predict_next_tuesday = predict[no_of_days_elapsed + 8]
        predict_next_wednesday = predict[no_of_days_elapsed + 8]
        predict_next_thursday = predict[no_of_days_elapsed + 10]
        predict_next_friday = predict[no_of_days_elapsed + 11]

        next_week_predicted_price = int(predict_next_sunday + predict_next_monday + predict_next_tuesday
                                        + predict_next_wednesday + predict_next_thursday + predict_next_friday) / 6
        next_week_predicted_price = "{:.2f}".format(next_week_predicted_price)
        print("Next week predicted price for", item_name, next_week_predicted_price)

        # finding the tomorrow and next week date
        td1 = datetime.timedelta(days=1)
        td2 = datetime.timedelta(days=6)
        tomorrow_date = today_date + td1
        next_week_date = datetime.date.today() + td2

    elif date_string == "Tuesday":

        # Predicting this week prices
        predict_sunday = predict[no_of_days_elapsed - 2]
        predict_monday = predict[no_of_days_elapsed - 1]
        predict_tuesday = predict[no_of_days_elapsed]
        predict_wednesday = predict[no_of_days_elapsed + 1]
        predict_thursday = predict[no_of_days_elapsed + 2]
        predict_friday = predict[no_of_days_elapsed + 3]

        week_predicted_price = int(predict_sunday + predict_monday + predict_tuesday + predict_wednesday
                                   + predict_thursday + predict_friday) / 6
        week_predicted_price = "{:.2f}".format(week_predicted_price)
        print("This week predicted price for", item_name, week_predicted_price)

        # Predicting next week prices
        predict_next_sunday = predict[no_of_days_elapsed + 5]
        predict_next_monday = predict[no_of_days_elapsed + 6]
        predict_next_tuesday = predict[no_of_days_elapsed + 7]
        predict_next_wednesday = predict[no_of_days_elapsed + 8]
        predict_next_thursday = predict[no_of_days_elapsed + 9]
        predict_next_friday = predict[no_of_days_elapsed + 10]
        next_week_predicted_price = int(predict_next_sunday + predict_next_monday + predict_next_tuesday
                                        + predict_next_wednesday + predict_next_thursday + predict_next_friday) / 6
        next_week_predicted_price = "{:.2f}".format(next_week_predicted_price)
        print("Next week predicted price for", item_name, next_week_predicted_price)

        # finding the tomorrow and next week date
        td1 = datetime.timedelta(days=1)
        td2 = datetime.timedelta(days=5)
        tomorrow_date = today_date + td1
        next_week_date = datetime.date.today() + td2

    elif date_string == "Wednesday":

        # Predicting this week prices
        predict_sunday = predict[no_of_days_elapsed - 3]
        predict_monday = predict[no_of_days_elapsed - 2]
        predict_tuesday = predict[no_of_days_elapsed - 1]
        predict_wednesday = predict[no_of_days_elapsed]
        predict_thursday = predict[no_of_days_elapsed + 1]
        predict_friday = predict[no_of_days_elapsed + 2]

        week_predicted_price = int(predict_sunday + predict_monday + predict_tuesday + predict_wednesday
                                   + predict_thursday + predict_friday) / 6
        week_predicted_price = "{:.2f}".format(week_predicted_price)
        print("This week predicted price for", item_name, week_predicted_price)

        # Predicting next week prices
        predict_next_sunday = predict[no_of_days_elapsed + 4]
        predict_next_monday = predict[no_of_days_elapsed + 5]
        predict_next_tuesday = predict[no_of_days_elapsed + 6]
        predict_next_wednesday = predict[no_of_days_elapsed + 7]
        predict_next_thursday = predict[no_of_days_elapsed + 8]
        predict_next_friday = predict[no_of_days_elapsed + 9]
        next_week_predicted_price = int(predict_next_sunday + predict_next_monday + predict_next_tuesday
                                        + predict_next_wednesday + predict_next_thursday + predict_next_friday) / 6
        next_week_predicted_price = "{:.2f}".format(next_week_predicted_price)
        print("Next week predicted price for", item_name, next_week_predicted_price)

        # finding the tomorrow and next week date
        td1 = datetime.timedelta(days=1)
        td2 = datetime.timedelta(days=4)
        tomorrow_date = today_date + td1
        next_week_date = datetime.date.today() + td2

    elif date_string == "Thursday":

        # Predicting this week prices
        predict_sunday = predict[no_of_days_elapsed - 4]
        predict_monday = predict[no_of_days_elapsed - 3]
        predict_tuesday = predict[no_of_days_elapsed - 2]
        predict_wednesday = predict[no_of_days_elapsed - 1]
        predict_thursday = predict[no_of_days_elapsed]
        predict_friday = predict[no_of_days_elapsed + 1]

        week_predicted_price = int(predict_sunday + predict_monday + predict_tuesday + predict_wednesday
                                   + predict_thursday + predict_friday) / 6
        week_predicted_price = "{:.2f}".format(week_predicted_price)
        print("This week predicted price for", item_name, week_predicted_price)

        # Predicting next week prices
        predict_next_sunday = predict[no_of_days_elapsed + 3]
        predict_next_monday = predict[no_of_days_elapsed + 4]
        predict_next_tuesday = predict[no_of_days_elapsed + 5]
        predict_next_wednesday = predict[no_of_days_elapsed + 6]
        predict_next_thursday = predict[no_of_days_elapsed + 7]
        predict_next_friday = predict[no_of_days_elapsed + 8]

        next_week_predicted_price = int(predict_next_sunday + predict_next_monday + predict_next_tuesday
                                        + predict_next_wednesday + predict_next_thursday + predict_next_friday) / 6
        next_week_predicted_price = "{:.2f}".format(next_week_predicted_price)
        print("Next week predicted price for", item_name, next_week_predicted_price)

        # finding the tomorrow and next week date
        td1 = datetime.timedelta(days=1)
        td2 = datetime.timedelta(days=3)
        tomorrow_date = today_date + td1
        next_week_date = datetime.date.today() + td2

    elif date_string == "Friday":

        # Predicting this week prices
        predict_sunday = predict[no_of_days_elapsed - 5]
        predict_monday = predict[no_of_days_elapsed - 4]
        predict_tuesday = predict[no_of_days_elapsed - 3]
        predict_wednesday = predict[no_of_days_elapsed - 2]
        predict_thursday = predict[no_of_days_elapsed - 1]
        predict_friday = predict[no_of_days_elapsed]

        week_predicted_price = int(predict_sunday + predict_monday + predict_tuesday + predict_wednesday
                                   + predict_thursday + predict_friday) / 6
        week_predicted_price = "{:.2f}".format(week_predicted_price)
        print("This week predicted price for", item_name, week_predicted_price)

        # Predicting next week prices
        predict_next_sunday = predict[no_of_days_elapsed + 2]
        predict_next_monday = predict[no_of_days_elapsed + 3]
        predict_next_tuesday = predict[no_of_days_elapsed + 4]
        predict_next_wednesday = predict[no_of_days_elapsed + 5]
        predict_next_thursday = predict[no_of_days_elapsed + 6]
        predict_next_friday = predict[no_of_days_elapsed + 7]
        next_week_predicted_price = int(predict_next_sunday + predict_next_monday + predict_next_tuesday
                                        + predict_next_wednesday + predict_next_thursday + predict_next_friday) / 6
        next_week_predicted_price = "{:.2f}".format(next_week_predicted_price)
        print("Next week predicted price for", item_name, next_week_predicted_price)

        # finding the tomorrow and next week date
        td1 = datetime.timedelta(days=1)
        td2 = datetime.timedelta(days=2)
        tomorrow_date = today_date + td1
        next_week_date = datetime.date.today() + td2

    elif date_string == "Saturday":

        # Predicting this week prices
        predict_sunday = predict[no_of_days_elapsed - 6]
        predict_monday = predict[no_of_days_elapsed - 5]
        predict_tuesday = predict[no_of_days_elapsed - 4]
        predict_wednesday = predict[no_of_days_elapsed - 3]
        predict_thursday = predict[no_of_days_elapsed - 2]
        predict_friday = predict[no_of_days_elapsed - 1]

        week_predicted_price = int(predict_sunday + predict_monday + predict_tuesday + predict_wednesday
                                   + predict_thursday + predict_friday) / 6
        week_predicted_price = "{:.2f}".format(week_predicted_price)
        print("This week predicted price for", item_name, week_predicted_price)

        # Predicting next week prices
        predict_next_sunday = predict[no_of_days_elapsed + 1]
        predict_next_monday = predict[no_of_days_elapsed + 2]
        predict_next_tuesday = predict[no_of_days_elapsed + 3]
        predict_next_wednesday = predict[no_of_days_elapsed + 3]
        predict_next_thursday = predict[no_of_days_elapsed + 4]
        predict_next_friday = predict[no_of_days_elapsed + 6]
        next_week_predicted_price = int(predict_next_sunday + predict_next_monday + predict_next_tuesday
                                        + predict_next_wednesday + predict_next_thursday + predict_next_friday) / 6
        next_week_predicted_price = "{:.2f}".format(next_week_predicted_price)
        print("Next week predicted price for", item_name, next_week_predicted_price)

        # finding the tomorrow and next week date
        td1 = datetime.timedelta(days=1)
        td2 = datetime.timedelta(days=1)
        tomorrow_date = today_date + td1
        next_week_date = datetime.date.today() + td2

    margin_of_error = train_and_test_data(item_name, p, q, r)
    print("Margin of error for", item_name, margin_of_error, "\n")

    # Saving all data to mongo db
    item_price = {
        "name": item_name,
        "today": today_price,
        "tomorrow": tomorrow_price,
        "week": week_predicted_price,
        "nextWeek": next_week_predicted_price,
        "error": margin_of_error,
        "date": datetime.datetime.today().strftime('%Y-%m-%d'),
        "tomorrowDate": tomorrow_date.strftime('%Y-%m-%d'),
        "nextWeekDate": next_week_date.strftime('%Y-%m-%d'),
        "_id": item_id
    }
    # Preventing collection duplicates in mongo db
    try:
        collection.insert_one(item_price)
        print(item_name, "data inserted to mongodb successfully\n")
    except DuplicateKeyError:
        print("Predicted", item_name, "data already available in mongodb\n")


def predict_bean_price():
    item_name = 'Beans'
    item_id = 1

    # find_suitable_model(item_name)

    # initializing the arima model for beans
    model2 = ARIMA(data[item_name], order=(2, 1, 2))
    model2 = model2.fit(disp=0)

    # Predicting from the dataset end date up to 13 days from today
    predict = (model2.predict(start=len(data), end=len(data) + (int(no_of_days_elapsed) + 13), typ='levels')
               .rename('Bean Price Predictions'))

    # Fitting the date indexes to the predicted data
    index_future_dates = pd.date_range(start=str(dataset_end_date), end=str(datetime.date.today() + td))
    predict.index = index_future_dates

    predict_price(predict, item_name, 2, 1, 2, item_id)


def predict_carrot_price():
    item_name = 'Carrot'
    item_id = 2

    # find_suitable_model(item_name)

    # initializing the arima model for carrot
    model2 = ARIMA(data['Carrot'], order=(1, 0, 1))
    model2 = model2.fit(disp=0)

    # Predicting from the dataset end date up to 13 days from today
    predict = (model2.predict(start=len(data), end=len(data) + no_of_days_elapsed + 13, typ='levels')
               .rename('Carrot Price Predictions'))

    # Fitting the date indexes to the predicted data
    index_future_dates = pd.date_range(start=str(dataset_end_date), end=str(datetime.date.today() + td))
    predict.index = index_future_dates

    predict_price(predict, item_name, 1, 0, 1, item_id)


def predict_leeks_price():
    item_name = "Leeks"
    item_id = 3

    # find_suitable_model(item_name)

    # initializing the arima model for leeks
    model2 = ARIMA(data['Leeks'], order=(0, 1, 2))
    model2 = model2.fit(disp=0)

    # Predicting from the dataset end date up to 13 days from today
    predict = (model2.predict(start=len(data), end=len(data) + no_of_days_elapsed + 13, typ='levels')
               .rename('Leeks Price Predictions'))

    # Fitting the date indexes to the predicted data
    index_future_dates = pd.date_range(start=str(dataset_end_date), end=str(datetime.date.today() + td))
    predict.index = index_future_dates

    predict_price(predict, item_name, 2, 1, 2, item_id)


def predict_beetroot_price():
    item_name = "Beet root"
    item_id = 4

    # find_suitable_model(item_name)

    # initializing the arima model for beet root
    model2 = ARIMA(data[item_name], order=(0, 1, 0))
    model2 = model2.fit(disp=0)

    # Predicting from the dataset end date up to 13 days from today
    predict = (model2.predict(start=len(data), end=len(data) + no_of_days_elapsed + 13, typ='levels')
               .rename('Beetroot Price Predictions'))

    # Fitting the date indexes to the predicted data
    index_future_dates = pd.date_range(start=str(dataset_end_date), end=str(datetime.date.today() + td))
    predict.index = index_future_dates

    predict_price(predict, item_name, 0, 1, 0, item_id)


def predict_knolkhol_price():
    item_name = "Knolkhol"
    item_id = 5

    # find_suitable_model(item_name)

    # initializing the arima model for knolkhol
    model2 = ARIMA(data[item_name], order=(0, 1, 2))
    model2 = model2.fit(disp=0)

    # Predicting from the dataset end date up to 13 days from today
    predict = (model2.predict(start=len(data), end=len(data) + no_of_days_elapsed + 13, typ='levels')
               .rename('Knolkhol Price Predictions'))

    # Fitting the date indexes to the predicted data
    index_future_dates = pd.date_range(start=str(dataset_end_date), end=str(datetime.date.today() + td))
    predict.index = index_future_dates

    predict_price(predict, item_name, 1, 1, 1, item_id)


def predict_cabbage_price():
    item_name = "Cabbage"
    item_id = 6

    # find_suitable_model(item_name)

    # initializing the arima model for cabbage
    model2 = ARIMA(data[item_name], order=(1, 0, 1))
    model2 = model2.fit(disp=0)

    # Predicting from the dataset end date up to 13 days from today
    predict = (model2.predict(start=len(data), end=len(data) + no_of_days_elapsed + 13, typ='levels')
               .rename('Cabbage Price Predictions'))

    # Fitting the date indexes to the predicted data
    index_future_dates = pd.date_range(start=str(dataset_end_date), end=str(datetime.date.today() + td))
    predict.index = index_future_dates

    predict_price(predict, item_name, 1, 0, 1, item_id)


def predict_tomato_price():
    item_name = "Tomato"
    item_id = 7

    # find_suitable_model(item_name)

    # initializing the arima model for tomato
    model2 = ARIMA(data[item_name], order=(0, 1, 1))
    model2 = model2.fit(disp=0)

    # Predicting from the dataset end date up to 13 days from today
    predict = (model2.predict(start=len(data), end=len(data) + no_of_days_elapsed + 13, typ='levels')
               .rename('Tomato Price Predictions'))

    # Fitting the date indexes to the predicted data
    index_future_dates = pd.date_range(start=str(dataset_end_date), end=str(datetime.date.today() + td))
    predict.index = index_future_dates

    predict_price(predict, item_name, 0, 1, 1, item_id)


def predict_ladies_fingers_price():
    item_name = "Ladies Fingers"
    item_id = 8

    # find_suitable_model(item_name)

    # initializing the arima model for ladies fingers
    model2 = ARIMA(data[item_name], order=(3, 0, 1))
    model2 = model2.fit(disp=0)

    # Predicting from the dataset end date up to 13 days from today
    predict = (model2.predict(start=len(data), end=len(data) + no_of_days_elapsed + 13, typ='levels')
               .rename('Ladies Fingers Price Predictions'))

    # Fitting the date indexes to the predicted data
    index_future_dates = pd.date_range(start=str(dataset_end_date), end=str(datetime.date.today() + td))
    predict.index = index_future_dates

    predict_price(predict, item_name, 3, 0, 1, item_id)


def predict_brinjals_price():
    item_name = "Brinjals"
    item_id = 9

    # find_suitable_model(item_name)

    # initializing the arima model for brinjals
    model2 = ARIMA(data[item_name], order=(0, 1, 1))
    model2 = model2.fit(disp=0)

    # Predicting from the dataset end date up to 13 days from today
    predict = (model2.predict(start=len(data), end=len(data) + no_of_days_elapsed + 13, typ='levels')
               .rename('Brinjals Price Predictions'))

    # Fitting the date indexes to the predicted data
    index_future_dates = pd.date_range(start=str(dataset_end_date), end=str(datetime.date.today() + td))
    predict.index = index_future_dates

    predict_price(predict, item_name, 0, 1, 1, item_id)


def predict_pumpkin_price():
    item_name = "Pumpkin"
    item_id = 10

    # find_suitable_model(item_name)

    # initializing the arima model for pumpkin
    model2 = ARIMA(data[item_name], order=(2, 1, 3))
    model2 = model2.fit(disp=0)

    # Predicting from the dataset end date up to 13 days from today
    predict = (model2.predict(start=len(data), end=len(data) + no_of_days_elapsed + 13, typ='levels')
               .rename('Pumpkin Price Predictions'))

    # Fitting the date indexes to the predicted data
    index_future_dates = pd.date_range(start=str(dataset_end_date), end=str(datetime.date.today() + td))
    predict.index = index_future_dates

    predict_price(predict, item_name, 2, 1, 3, item_id)


def predict_cucumber_price():
    item_name = "Cucumber"
    item_id = 11

    # find_suitable_model(item_name)

    # initializing the arima model for cucumber
    model2 = ARIMA(data[item_name], order=(1, 0, 3))
    model2 = model2.fit(disp=0)

    # Predicting from the dataset end date up to 13 days from today
    predict = (model2.predict(start=len(data), end=len(data) + no_of_days_elapsed + 13, typ='levels')
               .rename('Cucumber Price Predictions'))

    # Fitting the date indexes to the predicted data
    index_future_dates = pd.date_range(start=str(dataset_end_date), end=str(datetime.date.today() + td))
    predict.index = index_future_dates

    predict_price(predict, item_name, 1, 0, 3, item_id)


def predict_bitter_gourd_price():
    item_name = "Bitter Gourd"
    item_id = 12

    # find_suitable_model(item_name)

    # initializing the arima model for bitter gourd
    model2 = ARIMA(data[item_name], order=(0, 1, 0))
    model2 = model2.fit(disp=0)

    # Predicting from the dataset end date up to 13 days from today
    predict = (model2.predict(start=len(data), end=len(data) + no_of_days_elapsed + 13, typ='levels')
               .rename('Bitter Gourd Price Predictions'))

    # Fitting the date indexes to the predicted data
    index_future_dates = pd.date_range(start=str(dataset_end_date), end=str(datetime.date.today() + td))
    predict.index = index_future_dates

    predict_price(predict, item_name, 0, 1, 0, item_id)


def predict_green_chillies_price():
    item_name = "Green Chillies"
    item_id = 13

    # find_suitable_model(item_name)

    # initializing the arima model for green chillies
    model2 = ARIMA(data[item_name], order=(2, 1, 2))
    model2 = model2.fit(disp=0)

    # Predicting from the dataset end date up to 13 days from today
    predict = (model2.predict(start=len(data), end=len(data) + no_of_days_elapsed + 13, typ='levels')
               .rename('Green Chillies Price Predictions'))

    # Fitting the date indexes to the predicted data
    index_future_dates = pd.date_range(start=str(dataset_end_date), end=str(datetime.date.today() + td))
    predict.index = index_future_dates

    predict_price(predict, item_name, 2, 1, 2, item_id)


def predict_lime_price():
    item_name = "Lime"
    item_id = 14

    # find_suitable_model(item_name)

    # initializing the arima model for lime
    model2 = ARIMA(data[item_name], order=(3, 1, 2))
    model2 = model2.fit(disp=0)

    # Predicting from the dataset end date up to 13 days from today
    predict = (model2.predict(start=len(data), end=len(data) + no_of_days_elapsed + 13, typ='levels')
               .rename('Lime Price Predictions'))

    # Fitting the date indexes to the predicted data
    index_future_dates = pd.date_range(start=str(dataset_end_date), end=str(datetime.date.today() + td))
    predict.index = index_future_dates

    predict_price(predict, item_name, 3, 1, 2, item_id)


def predict_potato_price():
    item_name = "Potato"
    item_id = 15

    # find_suitable_model(item_name)

    # initializing the arima model for potato
    model2 = ARIMA(data[item_name], order=(0, 1, 1))
    model2 = model2.fit(disp=0)

    # Predicting from the dataset end date up to 13 days from today
    predict = (model2.predict(start=len(data), end=len(data) + no_of_days_elapsed + 13, typ='levels')
               .rename('Potato Price Predictions'))

    # Fitting the date indexes to the predicted data
    index_future_dates = pd.date_range(start=str(dataset_end_date), end=str(datetime.date.today() + td))
    predict.index = index_future_dates

    predict_price(predict, item_name, 0, 1, 1, item_id)


def predict_banana_price():
    item_name = "Banana"
    item_id = 16

    # find_suitable_model(item_name)

    # initializing the arima model for banana
    model2 = ARIMA(data[item_name], order=(0, 1, 3))
    model2 = model2.fit(disp=0)

    # Predicting from the dataset end date up to 13 days from today
    predict = (model2.predict(start=len(data), end=len(data) + no_of_days_elapsed + 13, typ='levels')
               .rename('Banana Price Predictions'))

    # Fitting the date indexes to the predicted data
    index_future_dates = pd.date_range(start=str(dataset_end_date), end=str(datetime.date.today() + td))
    predict.index = index_future_dates

    predict_price(predict, item_name, 0, 1, 3, item_id)


def predict_papaya_price():
    item_name = "Papaya"
    item_id = 17

    # find_suitable_model(item_name)

    # initializing the arima model for papaya
    model2 = ARIMA(data[item_name], order=(2, 0, 2))
    model2 = model2.fit(disp=0)

    # Predicting from the dataset end date up to 13 days from today
    predict = (model2.predict(start=len(data), end=len(data) + no_of_days_elapsed + 13, typ='levels')
               .rename('Papaya Price Predictions'))

    # Fitting the date indexes to the predicted data
    index_future_dates = pd.date_range(start=str(dataset_end_date), end=str(datetime.date.today() + td))
    predict.index = index_future_dates

    predict_price(predict, item_name, 2, 0, 2, item_id)


def predict_pineapple_price():
    item_name = "Pineapple"
    item_id = 18

    # find_suitable_model(item_name)

    # initializing the arima model for pineapple
    model2 = ARIMA(data[item_name], order=(0, 1, 2))
    model2 = model2.fit(disp=0)

    # Predicting from the dataset end date up to 13 days from today
    predict = (model2.predict(start=len(data), end=len(data) + no_of_days_elapsed + 13, typ='levels')
               .rename('Pineapple Price Predictions'))

    # Fitting the date indexes to the predicted data
    index_future_dates = pd.date_range(start=str(dataset_end_date), end=str(datetime.date.today() + td))
    predict.index = index_future_dates

    predict_price(predict, item_name, 0, 1, 2, item_id)


def predict_mango_price():
    item_name = "Mango"
    item_id = 19

    # find_suitable_model(item_name)

    # initializing the arima model for mango
    model2 = ARIMA(data[item_name], order=(2, 0, 2))
    model2 = model2.fit(disp=0)

    # Predicting from the dataset end date up to 13 days from today
    predict = (model2.predict(start=len(data), end=len(data) + no_of_days_elapsed + 13, typ='levels')
               .rename('Mango Price Predictions'))

    # Fitting the date indexes to the predicted data
    index_future_dates = pd.date_range(start=str(dataset_end_date), end=str(datetime.date.today() + td))
    predict.index = index_future_dates

    predict_price(predict, item_name, 2, 0, 2, item_id)


def predict_avocado_price():
    item_name = "Avocado"
    item_id = 20

    # find_suitable_model(item_name)

    # initializing the arima model for avocado
    model2 = ARIMA(data[item_name], order=(0, 1, 1))
    model2 = model2.fit(disp=0)

    # Predicting from the dataset end date up to 13 days from today
    predict = (model2.predict(start=len(data), end=len(data) + no_of_days_elapsed + 13, typ='levels')
               .rename('Avocado Price Predictions'))

    # Fitting the date indexes to the predicted data
    index_future_dates = pd.date_range(start=str(dataset_end_date), end=str(datetime.date.today() + td))
    predict.index = index_future_dates

    predict_price(predict, item_name, 0, 1, 1, item_id)


while True:
    start_time = time.time()
    collection = db[str(today_date)]
    predict_bean_price()
    predict_carrot_price()
    predict_leeks_price()
    predict_beetroot_price()
    predict_knolkhol_price()
    predict_cabbage_price()
    predict_tomato_price()
    predict_ladies_fingers_price()
    predict_brinjals_price()
    predict_pumpkin_price()
    predict_cucumber_price()
    predict_bitter_gourd_price()
    predict_green_chillies_price()
    predict_lime_price()
    predict_potato_price()
    predict_banana_price()
    predict_papaya_price()
    predict_pineapple_price()
    predict_mango_price()
    predict_avocado_price()

    print("Checking for updates...")
    print("--- %s seconds ---" % (time.time() - start_time))
    # Program sleeping until the beginning of next day
    while today_date == datetime.date.today():
        time.sleep(0)

    # Updating date values at the beginning of the day
    today_date = datetime.date.today()
    print("Date updated to", today_date, "\n")
    no_of_days_elapsed = (today_date - dataset_end_date).days
    td = datetime.timedelta(days=13)

import os
import pandas as pd

def pull_data(request):
    data = os.path.join(request.folder, 'private', 'data', 'dataset_1', 'Video_Games_Sales_as_at_22_Dec_2016.csv')
    return pd.read_csv(data)

def index():
    return dict()


def get_data():
    data = os.path.join(request.folder, 'private', 'data', 'dataset_1', 'Video_Games_Sales_as_at_22_Dec_2016.csv')

    df = pd.read_csv(data)
    df['adjusted_user_score'] = pd.to_numeric(df.User_Score, errors='coerce') * 10
    df['score_spread'] = df.adjusted_user_score - df.Critic_Score
    df['score_spread'] = df.score_spread.apply(abs)
    top_games = df.loc[df.score_spread.nlargest(n=10).index]

    output = {}
    output['big_diff'] = {}
    output['big_diff']['names'] = top_games.Name.values.tolist()
    output['big_diff']['data'] = top_games.score_spread.values.astype(str).tolist()

    return json(output)


def user():
    """
    exposes:
    http://..../[app]/default/user/login
    http://..../[app]/default/user/logout
    http://..../[app]/default/user/register
    http://..../[app]/default/user/profile
    http://..../[app]/default/user/retrieve_password
    http://..../[app]/default/user/change_password
    http://..../[app]/default/user/bulk_register
    use @auth.requires_login()
        @auth.requires_membership('group name')
        @auth.requires_permission('read','table name',record_id)
    to decorate functions that need access control
    also notice there is http://..../[app]/appadmin/manage/auth to allow administrator to manage users
    """
    return dict(form=auth())


@cache.action()
def download():
    """
    allows downloading of uploaded files
    http://..../[app]/default/download/[filename]
    """
    return response.download(request, db)


def call():
    """
    exposes services. for example:
    http://..../[app]/default/call/jsonrpc
    decorate with @services.jsonrpc the functions to expose
    supports xml, json, xmlrpc, jsonrpc, amfrpc, rss, csv
    """
    return service()



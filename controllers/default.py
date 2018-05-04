def index():
    return dict()


def get_data():
    from ujson import dumps
    s = datetime.now()
    df = pull_data(request)
    output = {}
    form_data = dict(request.vars)
    if 'selected[]' in form_data:
        selected_platforms = form_data['selected[]']
        if isinstance(selected_platforms, str):
            df = df[df.Platform == selected_platforms]
        else:
            df = df[df.Platform.isin(selected_platforms)]

    df['adjusted_user_score'] = pd.to_numeric(df.User_Score, errors='coerce') * 10
    df['score_spread'] = df.adjusted_user_score - df.Critic_Score
    df['score_spread'] = df.score_spread.apply(abs)
    top_games = df.loc[df.score_spread.nlargest(n=10).index]

    output['chart1_data'] = {}
    output['chart1_data']['labels'] = top_games.Name.values.tolist()
    output['chart1_data']['series'] = top_games.score_spread.values.astype(str).tolist()

    top_sales = df.groupby('Publisher').Global_Sales.sum().nlargest(10)

    output['chart2_data'] = {}
    output['chart2_data']['labels'] = top_sales.index.tolist()
    output['chart2_data']['series'] = top_sales.map(str).tolist()

    data = df.groupby(['Year_of_Release', 'Platform']).Global_Sales.sum()
    years = np.unique([x[0] for x in data.index]).tolist()
    platforms = np.unique([x[1] for x in data.index]).tolist()
    chart_data = [
                    {
                        'name': p,
                        'data': [None if p not in data[y] else data[y][p] * 1000000 for y in years]
                    }
                     for p in platforms]
    output['chart3_data'] = {}
    output['chart3_data']['labels'] = years
    output['chart3_data']['series'] = chart_data

    output['run_time'] = (datetime.now() - s).total_seconds()
    return dumps(output)

def get_platform():
    return json(sorted(pull_data(request).Platform.unique()))


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



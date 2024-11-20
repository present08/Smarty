from flask import Flask
from flask_cors import CORS

from charts.AdminRentalStatistics import admin_rental_statistics_bp
# from charts.bar_chart import bar_chart_bp
# from charts.daily_scheduler import daily_scheduler_bp
from charts.income_rate import income_comparison_bp
# from charts.line_chart import line_chart_bp
# from charts.personally_chart import personally_chart_bp
# from charts.pie_chart import pie_chart_bp
# from charts.rental_statistics import rental_statistics_bp

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# 차트별 Blueprint 등록
# app.register_blueprint(bar_chart_bp, url_prefix='/api')
# app.register_blueprint(line_chart_bp, url_prefix='/api')
# app.register_blueprint(pie_chart_bp, url_prefix='/api')
# app.register_blueprint(daily_scheduler_bp, url_prefix='/api')
# app.register_blueprint(rental_statistics_bp, url_prefix='/api')
# app.register_blueprint(personally_chart_bp, url_prefix='/api')
app.register_blueprint(income_comparison_bp, url_prefix='/api')
app.register_blueprint(admin_rental_statistics_bp, url_prefix='/api')



if __name__ == '__main__':
    app.run(debug=True,  use_reloader=False)

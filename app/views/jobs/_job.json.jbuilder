json.extract! job, :id, :due_date, :cost, :status, :created_at, :updated_at
json.url job_url(job, format: :json)

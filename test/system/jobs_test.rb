require "application_system_test_case"

class JobsTest < ApplicationSystemTestCase
  setup { @job = jobs(:one) }

  test "visiting the index" do
    visit jobs_url
    assert_selector "h1", text: "Jobs"
  end

  test "should create job" do
    visit jobs_url
    click_on "New job"

    fill_in "Cost", with: @job.cost
    fill_in "Due date", with: @job.due_date
    fill_in "Status", with: @job.status
    click_on "Create Job"

    assert_text "Job was successfully created"
    click_on "Back"
  end

  test "should update Job" do
    visit job_url(@job)
    click_on "Edit this job", match: :first

    fill_in "Cost", with: @job.cost
    fill_in "Due date", with: @job.due_date.to_s
    fill_in "Status", with: @job.status
    click_on "Update Job"

    assert_text "Job was successfully updated"
    click_on "Back"
  end

  test "should destroy Job" do
    visit job_url(@job)
    click_on "Destroy this job", match: :first

    assert_text "Job was successfully destroyed"
  end
end

import { study_plan } from "@/app/api/study-plan/route";
import { FilterState } from "@/components/pages/study-plans/FilterMenu";

function dragdownFilter(study_plan: study_plan, filterState: FilterState): boolean {
  if (filterState.is_approved === "all") return true
  return (
    (filterState.is_approved === "only" && study_plan.is_approved === 1) ||
    (filterState.is_approved === "not" && study_plan.is_approved === 0)
  )
}
export function filterPlans(plans: study_plan[], filterState: FilterState): study_plan[] {
  return plans.filter((plan) => dragdownFilter(plan, filterState))
    .filter((plan) => filterState.speciality_id.length === 0 || filterState.speciality_id.includes(plan.speciality_id))
    .filter((plan) => filterState.level_id.length === 0 || filterState.level_id.includes(plan.level_id))
    .filter((plan) => filterState.department_id.length === 0 || filterState.department_id.includes(plan.department_id))
    .filter((plan) => filterState.faculty_id.length === 0 || filterState.faculty_id.includes(plan.faculty_id))
    .filter((plan) => filterState.subject_id.length === 0 || filterState.subject_id.includes(plan.subject.subject_id))
    .filter((plan) => filterState.form_id.length === 0 || filterState.form_id.includes(plan.form_id))
    .filter((plan) => filterState.duration_id.length === 0 || filterState.duration_id.includes(plan.duration_id))
    .filter((plan) => filterState.qualification_id.length === 0 || filterState.qualification_id.includes(plan.qualification_id));
}
@Library('pipeline') _

def version = '20.4000'

node ('controls') {
    checkout_pipeline("20.4000/bugfix/bls/builder_timeout")
    run_branch = load '/home/sbis/jenkins_pipeline/platforma/branch/run_branch'
    run_branch.execute('typescript', version)
}
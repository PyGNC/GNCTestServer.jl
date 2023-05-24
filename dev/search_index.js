var documenterSearchIndex = {"docs":
[{"location":"api/","page":"API","title":"API","text":"CurrentModule = SatellitePlayground","category":"page"},{"location":"api/#SatellitePlayground.jl-API","page":"API","title":"SatellitePlayground.jl API","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"The API all revolves around the simulate function which has two modes of running:","category":"page"},{"location":"api/","page":"API","title":"API","text":"Software in the loop: A separate program pretends to be a satellite, and the simulator and program communicate sensor/control data between them.   This is useful for testing your true satellite software to make sure the guidance, navigation, and controll code still works despite all the other things it is doing.\nControl function: A function is passed a measurement (by default the state, parameters, and time in body frame) and returns the magnetorquer control input.   This is useful for directly testing attitude control schemes.","category":"page"},{"location":"api/","page":"API","title":"API","text":"simulate","category":"page"},{"location":"api/#SatellitePlayground.simulate","page":"API","title":"SatellitePlayground.simulate","text":"simulate(control::Function)\nsimulate(launch::Cmd)\nsimulate(control::Function; log_init=default_log_init, log_step=default_log_step,\n    terminal_condition=default_terminate, max_iterations=1000, dt=0.5,\n    initial_condition=nothing, measure=default_measure, model=default_model,\n    environment=default_environment, silent=false)\n\nRuns a simulation from a random initial condition (or from initial_condition) if given. The simulation runs for max_iterations steps.\n\nThe model specifies things like the mass, inertia, drag coefficient of the satellite and control type (magnetorquer, reaction wheel, etc). The environment specifies things like the magnetic field.\n\nThe control input is computed via control(measurement) where measurement is the output of the measurement function. Or it is computed by an external process using GNCTestClient.py if launch is given.\n\nBy default the controller recieves the (state, environment) in the body frame. But this can be changed by setting the measurement function measure.\n\nThe simulation logs the state of the satellite at each time step by default. This can be changed by setting the log_* functions.\n\n\n\n\n\n","category":"function"},{"location":"api/#Other-Simulation-Modes","page":"API","title":"Other Simulation Modes","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"For simulating multiple satellites at once use:","category":"page"},{"location":"api/","page":"API","title":"API","text":"simulate_multiple","category":"page"},{"location":"api/#SatellitePlayground.simulate_multiple","page":"API","title":"SatellitePlayground.simulate_multiple","text":"simulate_multiple(controls::AbstractArray{Function})\nsimulate_multiple(controls::AbstractArray{Function}; log_init=default_log_init, log_step=default_log_step,\n    terminal_condition=default_terminate, max_iterations=1000, dt=0.1,\n    initial_conditions=nothing, measures=nothing,\n    models=nothing, initial_environment=default_environment)\n\n\n\n\n\n","category":"function"},{"location":"api/#Dynamics","page":"API","title":"Dynamics","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"There are two ways to change the dynamics of the simulation:","category":"page"},{"location":"api/","page":"API","title":"API","text":"Change the invidual satellite model (mass, inertia, control type, etc.)\nChange the environment model (e.g. earth gravity model, solar radiation pressure model, etc.)","category":"page"},{"location":"api/#State","page":"API","title":"State","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"RBState","category":"page"},{"location":"api/#SatellitePlayground.RBState","page":"API","title":"SatellitePlayground.RBState","text":"Based on: https://github.com/RoboticExplorationLab/RobotDynamics.jl/blob/master/src/rbstate.jl\n\nRBState{T} <: StaticVector{13,T}\n\nRepresents the state of a rigid body in 3D space, consisting of position, linear_velocity, attitude,      and angular velocity, respresented as a vector stacked in that order, with     the rotation represented as the 4 elements unit quaternion.\n\nImplements the StaticArrays interface so can be treated as an SVector with additional     methods.\n\nConstructors\n\nRBState{T}(r, v, q, ω)\nRBState{T}(x)\nRBState(r, v, q, ω)\nRBState(x)\n\nwhere r, v, and ω are three-dimensional vectors, q is either a Rotation or a     four-dimenional vector representing the parameters of unit quaternion, and x is a     13-dimensional vector (or tuple),\n\n\n\n\n\n","category":"type"},{"location":"api/#Defaults","page":"API","title":"Defaults","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"default_measure\ndefault_terminate","category":"page"},{"location":"api/#SatellitePlayground.default_measure","page":"API","title":"SatellitePlayground.default_measure","text":"default_measure(state::RBState, env::Environment)\n\nDefault measurement function used by simulate, returns the state and environment.\n\n\n\n\n\n","category":"function"},{"location":"api/#SatellitePlayground.default_terminate","page":"API","title":"SatellitePlayground.default_terminate","text":"default_terminate(state::RBState, env::Environment, i::Int)\n\ndefault termination condition for simulate, always returns false.\n\n\n\n\n\n","category":"function"},{"location":"api/#Useful-Helper-Functions","page":"API","title":"Useful Helper Functions","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"initialize_orbit\nworld_to_body\nvec_to_mat","category":"page"},{"location":"api/#SatellitePlayground.initialize_orbit","page":"API","title":"SatellitePlayground.initialize_orbit","text":"initialize_orbit(; r=nothing, v=nothing, a=nothing, q=nothing, ω=nothing, Rₑ=6378.137e3, μ=3.9860044188e14)\n\nInitializes a random, viable orbit given a few different terms, usually  a position 'r' in Cartesian coordinates. Initial velocity may be specified, but  if specified it will not necessarily result in a stable orbit. \n\nThe initial starting position, velocity, semi-major axis, orientation, and angular  velocity may be either specified or determined randomly. \n\nArguments:\n\nr:  (Optional) Height above ground that the satellite will start its orbit at    |  Scalar \nv:  (Optional) Magnitude of initial velocity                                     |  Scalar \na:  (Optional) Semi-major axis                                                   |  Scalar \nq:  (Optional) Initial attitude, as a unit quaternion                            |  [4,]\nω:  (Optional) Initial angular velocity                                          |  [3,]\n\nReturns:\n\nx:  Initial state, as (r, v, q, ω)                                               |  State\n\n\n\n\n\n","category":"function"},{"location":"api/#SatellitePlayground.world_to_body","page":"API","title":"SatellitePlayground.world_to_body","text":"world_to_body(::RBState, ::Vector)\n\nReturns the vector in the body frame\n\n\n\n\n\n","category":"function"},{"location":"api/#SatellitePlayground.vec_to_mat","page":"API","title":"SatellitePlayground.vec_to_mat","text":"vec_to_mat(hist)\n\nConverts a vector of vectors to a matrix. Useful for converting the output of a simulation to a format that can be plotted.\n\n\n\n\n\n","category":"function"},{"location":"api/#","page":"API","title":"","text":"","category":"section"},{"location":"#SatellitePlayground.jl","page":"Home","title":"SatellitePlayground.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"SatellitePlayground.jl is made for testing Guidance, Navigation, and Control software for cubesats. It is both for software in the loop testing and for testing just the specific GNC software.","category":"page"},{"location":"#Package-Features","page":"Home","title":"Package Features","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Detailed satellite dynamics model including with the following perturbations\nAttitude: gravity gradient, magnetic torque, solar radiation pressure, aerodynamic drag\nOrbit: spherical harmonic gravity, atmospheric drag, solar radiation pressure, third body from the sun and moon\nAbility to easily turn on and off perturbations\nSimulation with thrusters, reaction wheel, or magnetic torquers for control\nExplicitly defined measurement functions for adding error models\nTesting of GNC software implementations\nSoftware in the loop testing via a shared memory interface provided by GNCTestClient.py + this package.","category":"page"},{"location":"#Quick-Start-(Magnetorquer-Detumbling-Simulation-Example)","page":"Home","title":"Quick Start (Magnetorquer Detumbling Simulation Example)","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"In this example we'll write a simple detumbling test enviorment. First install the SatellitePlayground package, for ease of use, we'll define SP=SatellitePlayground","category":"page"},{"location":"","page":"Home","title":"Home","text":"using SatellitePlayground\nSP = SatellitePlayground","category":"page"},{"location":"","page":"Home","title":"Home","text":"To run a simulation with default parameters, one must supply a control function. To start we'll make a no_control function. By default measurement is a tuple of (state, environment).","category":"page"},{"location":"","page":"Home","title":"Home","text":"function no_control(measurement)\n    return zero(SP.Control)\nend","category":"page"},{"location":"","page":"Home","title":"Home","text":"To run this simulation simply run","category":"page"},{"location":"","page":"Home","title":"Home","text":"(hist, time) = SP.simulate(no_control)","category":"page"},{"location":"","page":"Home","title":"Home","text":"Hist will contain an array of the state at each time step, and time will contain an array of the time at each time step. We can plot the angular velocity over time with the following code.","category":"page"},{"location":"","page":"Home","title":"Home","text":"using Plots\nusing LinearAlgebra # for norm\nhist = [[state.angular_velocity; norm(state.angular_velocity)] for state in hist]\nhist = SP.vec_to_mat(hist)\nplot(time, hist, title=\"Angular Velocity\", xlabel=\"Time (s)\", ylabel=\"Angular Velocity (rad/s)\", labels=[\"ω1\" \"ω2\" \"ω3\" \"||ω||\"])","category":"page"},{"location":"","page":"Home","title":"Home","text":"This will result in a plot that is close to, but not exactly cyclic. This is because by default the simulation uses a model of the pycubed-mini satellite, with environmental perturbations enabled. (Image: Perturbations cause the components of the angular velocity not to be perfectly cyclic)","category":"page"},{"location":"","page":"Home","title":"Home","text":"By default this simulation will run for 1000 iterations. However, you change change this by setting max_iterations, or terminal_condition.","category":"page"},{"location":"","page":"Home","title":"Home","text":"In our case we will set increase the number of maximum iterations to 10,000, and make the simulation terminate once the angular velocity drops below 0.01 radians.","category":"page"},{"location":"","page":"Home","title":"Home","text":"function terminate(state::RBState, env::Environment, i::Int)\n    return norm(state.angular_velocity) < 0.01\nend\n(hist, time) = SP.simulate(no_control, max_iterations=10_000, terminal_condition=terminate)","category":"page"},{"location":"","page":"Home","title":"Home","text":"We will now use the b-cross controller to detumble the satellite.","category":"page"},{"location":"","page":"Home","title":"Home","text":"function bcross_controller(measurement)\n    (ω, b) = measurement\n\n    b̂ = b / norm(b)\n    k = 7e-4\n    M = -k * (I(3) - b̂ * b̂') * ω\n    m = 1 / (dot(b, b)) * cross(b, M)\n    return SP.Control(\n        m\n    )\nend","category":"page"},{"location":"","page":"Home","title":"Home","text":"To demonstrate measurement functions (which are intended for adding error models), we will write a measurement function that returns a measurement of the form (angular_velocity, b), rather than the default (state, environment).","category":"page"},{"location":"","page":"Home","title":"Home","text":"function measure(state, environment)\n    return (state.angular_velocity, environment.b)\nend","category":"page"},{"location":"","page":"Home","title":"Home","text":"Finally, we will run the simulation with the new controller and measurement function. This simulation will run for 10,000 iterations, or until the angular velocity drops below 0.01 radians. ","category":"page"},{"location":"","page":"Home","title":"Home","text":"(hist, time) = SP.simulate(bcross_controller, max_iterations=10_000, terminal_condition=terminate, measure=measure)","category":"page"},{"location":"","page":"Home","title":"Home","text":"This produces a plot similar to the following, which shows the satellite very slowly detumbling. This is primarily due to control limits being taken into account.","category":"page"},{"location":"","page":"Home","title":"Home","text":"(Image: Perturbations cause the components of the angular velocity not to be perfectly cyclic)","category":"page"},{"location":"","page":"Home","title":"Home","text":"We can remove the magnetic dipole limits via","category":"page"},{"location":"","page":"Home","title":"Home","text":"no_limit_pqmini_model = copy(SP.pqmini_model)\nno_limit_pqmini_model.control_limit = [Inf, Inf, Inf]\n(hist, time) = SP.simulate(bcross_controller, max_iterations=10_000, terminal_condition=terminate, measure=measure, model=no_limit_pqmini_model)","category":"page"},{"location":"","page":"Home","title":"Home","text":"This produces results similar to the following, which shows the satellite detumbling much faster, yet still exhibits some oscillations caused by perturbations.","category":"page"},{"location":"","page":"Home","title":"Home","text":"(Image: Pertubations cause minor oscillations in the angular velocity while detumbling)","category":"page"},{"location":"","page":"Home","title":"Home","text":"We can run the simulations withouth pertubations on attitude via","category":"page"},{"location":"","page":"Home","title":"Home","text":"env = copy(SP.default_environment)\nenv.config = SP.EnvironmentConfig(\n    include_drag=false,\n    include_solar_radiation_pressure=false,\n    include_gravity_gradient_torque=false\n)\n(hist, time) = SP.simulate(bcross_controller, max_iterations=10_000, terminal_condition=terminate, \n    measure=measure, model=no_limit_pqmini_model, environment=env)","category":"page"},{"location":"","page":"Home","title":"Home","text":"This should produce results similar to the following","category":"page"},{"location":"","page":"Home","title":"Home","text":"(Image: Angular Velocity over time with a detumbling controller) (Image: Angular Velocity over time with a detumbling controller) (Image: Angular Velocity over time with a detumbling controller)","category":"page"}]
}

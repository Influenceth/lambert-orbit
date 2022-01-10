const chai = require('chai');
const expect = chai.expect;
const almostEqual = require('almost-equal');
const solver = require('../src/solver');

const absTol = 0.01;
const relTol = 0.001;

describe('Izzo Lambert Solver', () => {
  it('should solve Example 5.7 from Fundamentals of Astrodynamics and Applications (4th Edition), by David A. Vallado', async () => {
    // Initial conditions
    const mu_earth = 3.986004418e5; // [km ** 3 / s ** 2]
    const r1 = [ 15945.34, 0.0, 0.0 ]; // [km]
    const r2 = [ 12214.83899, 10249.46731, 0.0 ]; // [km]
    const tof = 76.0 * 60;  // [s]

    // Solving the problem
    const [ v1, v2 ] = await solver(mu_earth, r1, r2, tof);

    // Expected final results
    const expected_v1 = [ 2.058913, 2.915965, 0.0 ]; // [km / s]
    const expected_v2 = [ -3.451565, 0.910315, 0.0 ]; // [km / s]

    v1.forEach((e, i) => expect(almostEqual(e, expected_v1[i], absTol, relTol)).to.be.true);
    v2.forEach((e, i) => expect(almostEqual(e, expected_v2[i], absTol, relTol)).to.be.true);
  });

  it('should solve Example 5.2 from Orbital Mechanics for Engineering Students (3rd Edition), by Howard D. Curtiss', async () => {
    // Initial conditions
    const mu_earth = 3.986004418e5; // [km ** 3 / s ** 2]
    const r1 = [ 5000.0, 10000.0, 2100.0 ]; // [km]
    const r2 = [ -14600.0, 2500.0, 7000.0 ]; // [km]
    const tof = 3600;  // [s]

    // Solving the problem
    const [ v1, v2 ] = await solver(mu_earth, r1, r2, tof);

    // Expected final results
    const expected_v1 = [ -5.9925, 1.9254, 3.2456 ]; // [km / s]
    const expected_v2 = [ -3.3125, -4.1966, -0.38529 ]; // [km / s]

    v1.forEach((e, i) => expect(almostEqual(e, expected_v1[i], absTol, relTol)).to.be.true);
    v2.forEach((e, i) => expect(almostEqual(e, expected_v2[i], absTol, relTol)).to.be.true);
  });

  it('should solve Example 7.12 from An Introduction to the Mathematics and Methods of Astrodynamics (Revised Edition), by Richard H. Battin', async () => {
    // Initial conditions
    const mu_sun = 39.47692641; // [AU ** 3 / year ** 2]
    const r1 = [ 0.159321004, 0.579266185, 0.052359607 ]; // [AU]
    const r2 = [ 0.057594337, 0.605750797, 0.068345246 ]; // [AU]
    const tof = 0.010794065; // [year]

    // Solving the problem
    const [ v1, v2 ] = await solver(mu_sun, r1, r2, tof);

    // Expected final results
    const expected_v1 = [ -9.303603251, 3.018641330, 1.536362143 ]; // [km / s]

    v1.forEach((e, i) => expect(almostEqual(e, expected_v1[i], absTol, relTol)).to.be.true);
  });

  it('should solve first orbit generated with GMAT2020a software from NASA', async () => {
    // Initial conditions
    const mu_earth = 3.986004418e5; // [km ** 3 / s ** 2]
    const r1 = [ 7100, 200, 1300 ]; // [km]
    // This vector was obtained after propagating the initial one with original velocity a given amount of time.
    const r2 = [ -38113.5870, 67274.1946, 29309.5799 ]; // [km]
    const tof = 12000; // [s]

    // Solving the problem
    const [ v1, v2 ] = await solver(mu_earth, r1, r2, tof);

    // Expected final results
    const expected_v1 = [ 0, 10.35, 5.5 ]; // [km / s]
    const expected_v2 = [ -3.6379, 4.4932, 1.7735 ]; // [km / s]

    v1.forEach((e, i) => expect(almostEqual(e, expected_v1[i], absTol, relTol)).to.be.true);
    v2.forEach((e, i) => expect(almostEqual(e, expected_v2[i], absTol, relTol)).to.be.true);
  });

  it('should solve second orbit generated with GMAT2020a software from NASA', async () => {
    // Initial conditions
    const mu_earth = 3.986004418e5; // [km ** 3 / s ** 2]
    const r1 = [ 7100, 200, 1300 ]; // [km]
    // This vector was obtained after propagating the initial one with original velocity a given amount of time.
    const r2 = [ -47332.7499, -54840.2027, -37100.17067 ]; // [km]
    const tof = 12000; // [s]

    // Solving the problem
    const [ v1, v2 ] = await solver(mu_earth, r1, r2, tof, 0, false);

    // Expected final results
    const expected_v1 = [ 0, -10.35, -5.5 ]; // [km / s]
    const expected_v2 = [ -4.3016, -3.4314, -2.5467 ]; // [km / s]

    v1.forEach((e, i) => expect(almostEqual(e, expected_v1[i], absTol, relTol)).to.be.true);
    v2.forEach((e, i) => expect(almostEqual(e, expected_v2[i], absTol, relTol)).to.be.true);
  });

  it('should solve first Example from Astrodynamics 102, by Gim J. Der. see: http://derastrodynamics.com/docs/astrodynamics_102_v2.pdf', async () => {
    // Initial conditions
    const mu_earth = 3.986004418e5; // [km ** 3 / s ** 2]
    const r1 =  [ 2249.171260, 1898.007100, 5639.599193 ]; // [km]
    const r2 = [ 1744.495443, -4601.556054, 4043.864391 ]; // [km]
    const tof = 1618.50; // [s]

    // prograde, low
    let [ v1, v2 ] = await solver(mu_earth, r1, r2, tof);
    let expected_v1 = [ -2.09572809, 3.92602196, -4.94516810 ]; // [km / s]
    let expected_v2 = [ 2.46309613, 0.84490197, 6.10890863 ]; // [km / s]
    v1.forEach((e, i) => expect(almostEqual(e, expected_v1[i], absTol, relTol)).to.be.true);
    v2.forEach((e, i) => expect(almostEqual(e, expected_v2[i], absTol, relTol)).to.be.true);

    // retrograde, high
    [ v1, v2 ] = await solver(mu_earth, r1, r2, tof, 0, false, false);
    expected_v1 = [ 1.94312182, -4.35300015, 4.54630439 ]; // [km / s]
    expected_v2 = [ -2.38885563, -1.42519647, -5.95772225 ]; // [km / s]
    v1.forEach((e, i) => expect(almostEqual(e, expected_v1[i], absTol, relTol)).to.be.true);
    v2.forEach((e, i) => expect(almostEqual(e, expected_v2[i], absTol, relTol)).to.be.true);
  });

  it('should solve second Example from Astrodynamics 102, by Gim J. Der. see: http://derastrodynamics.com/docs/astrodynamics_102_v2.pdf', async () => {
    // Initial conditions
    const mu_earth = 3.986004418e5; // [km ** 3 / s ** 2]
    const r1 =  [ 22592.145603, -1599.915239, -19783.950506 ]; // [km]
    const r2 = [ 1922.067697, 4054.157051, -8925.727465 ]; // [km]
    const tof = 36000; // [s]

    // prograde, high
    let [ v1, v2 ] = await solver(mu_earth, r1, r2, tof, 0, true, false);
    let expected_v1 = [ 2.000652697, 0.387688615, -2.666947760 ]; // [km / s]
    let expected_v2 = [ -3.79246619, -1.77707641, 6.856814395 ]; // [km / s]
    v1.forEach((e, i) => expect(almostEqual(e, expected_v1[i], absTol, relTol)).to.be.true);
    v2.forEach((e, i) => expect(almostEqual(e, expected_v2[i], absTol, relTol)).to.be.true);

    // retrograde, high
    [ v1, v2 ] = await solver(mu_earth, r1, r2, tof, 0, false, false);
    expected_v1 = [ 2.96616042, -1.27577231, -0.75545632 ]; // [km / s]
    expected_v2 = [ 5.8437455, -0.20047673, -5.48615883 ]; // [km / s]
    v1.forEach((e, i) => expect(almostEqual(e, expected_v1[i], absTol, relTol)).to.be.true);
    v2.forEach((e, i) => expect(almostEqual(e, expected_v2[i], absTol, relTol)).to.be.true);
  });
});

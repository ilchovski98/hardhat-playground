const { ethers } = require('hardhat');
const { expect, assert } = require('chai');

describe('SimpleStorage', () => {
  let simpleStorageFactory;
  let simpleStorage;

  beforeEach(async function() {
    simpleStorageFactory = await ethers.getContractFactory('SimpleStorage');
    simpleStorage = await simpleStorageFactory.deploy();
  })

  it('Should start with a favorite number of 0', async function() {
    const currentValue = await simpleStorage.retrieve();
    const expectedValue = "0";

    // assert
    // expect
    assert.equal(currentValue.toString(), expectedValue);
    // expect(currentValue.toString()).to.equal(expectedValue);
  });

  it('Should update when we call store', async function() {
    const expectedNumber = "22";
    const transactionResponse = await simpleStorage.store(expectedNumber);
    await transactionResponse.wait(1);

    const currentValue = await simpleStorage.retrieve();
    assert.equal(currentValue, expectedNumber);
  });

  it('Should save the favorite number of the person', async function() {
    const expectedNumber = "99";
    const transactionResponse = await simpleStorage.addPerson("Nikola", "99");
    await transactionResponse.wait(1);

    const currentValue = await simpleStorage.nameToFavoriteNumber("Nikola");
    assert.equal(currentValue, expectedNumber);
  });
})
